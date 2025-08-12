// src/db/sqlite.ts
import sqlite3InitModule from '@sqlite.org/sqlite-wasm'

let _db: any = null

export async function openDb() {
  if (_db) return _db
  const sqlite3 = await sqlite3InitModule()
  // OPFS-backed DB (persistent in browser)
  _db = new sqlite3.oo1.DB('file:enterprise-risk.db?vfs=opfs')
  migrate(_db)
  return _db
}

const MIGRATIONS = [
  `BEGIN;
   PRAGMA user_version=1;

   CREATE TABLE IF NOT EXISTS app_settings (
     id INTEGER PRIMARY KEY CHECK (id=1),
     hero_src_type TEXT NOT NULL DEFAULT 'url',
     hero_url TEXT,
     hero_blob BLOB,
     hero_alt TEXT DEFAULT 'Enterprise Risk overview',
     what_md TEXT,
     why_md TEXT,
     how_enterprise_md TEXT,
     how_project_md TEXT,
     faq_json TEXT,
     github_repo_url TEXT,
     treatment_guidelines_md TEXT,
     appetite_anchor_p INTEGER DEFAULT 3,
     appetite_anchor_i INTEGER DEFAULT 3,
     appetite_bend REAL DEFAULT 0,
     appetite_enabled INTEGER DEFAULT 1,
     green_max INTEGER DEFAULT 3,
     amber_max INTEGER DEFAULT 11,
     updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
   );

   INSERT INTO app_settings (
     id, hero_src_type, hero_url, what_md, why_md, how_enterprise_md, how_project_md, faq_json, github_repo_url, treatment_guidelines_md
   )
   SELECT 1,
          'url',
          'https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?w=1600&q=80&auto=format',
          '## What\nCapture, assess, mitigate, and report risks across projects and the enterprise.',
          '## Why\nConsistent 4x4/5x5 scoring, clear mitigations, exec-ready summaries.',
          '## How (Enterprise)\n1. Set perspective to Enterprise\n2. Add key risks per category\n3. Review Top 5 monthly',
          '## How (Projects)\n1. Add project risks\n2. Record pre P/I\n3. Add mitigations → update post P/I → Close',
          '[]',
          'https://github.com/gotaker/ITRM_App',
          'See Overview page for details.'
   WHERE NOT EXISTS (SELECT 1 FROM app_settings WHERE id=1);

   -- (Optional) minimal tables for future features
   CREATE TABLE IF NOT EXISTS users (
     id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, name TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP
   );
   CREATE TABLE IF NOT EXISTS projects (
     id TEXT PRIMARY KEY, name TEXT NOT NULL, code TEXT UNIQUE, active INTEGER NOT NULL DEFAULT 1, created_at TEXT DEFAULT CURRENT_TIMESTAMP
   );
   CREATE TABLE IF NOT EXISTS risks (
     id TEXT PRIMARY KEY, project_id TEXT, title TEXT NOT NULL, category TEXT, status TEXT DEFAULT 'Open',
     owner_id TEXT, perspective TEXT DEFAULT 'Project', created_at TEXT DEFAULT CURRENT_TIMESTAMP
   );
   CREATE TABLE IF NOT EXISTS assessments (
     id TEXT PRIMARY KEY, risk_id TEXT NOT NULL, phase TEXT NOT NULL CHECK(phase IN ('pre','post')),
     probability INTEGER NOT NULL CHECK (probability BETWEEN 1 AND 5),
     impact INTEGER NOT NULL CHECK (impact BETWEEN 1 AND 5),
     assessed_by TEXT, assessed_at TEXT DEFAULT CURRENT_TIMESTAMP
   );
   COMMIT;`
]

function migrate(db: any) {
  for (const sql of MIGRATIONS) db.exec(sql)
}

export function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const db = _db
  const stmt = db.prepare(sql)
  try {
    stmt.bind(params)
    const rows: any[] = []
    while (stmt.step()) rows.push(stmt.getAsObject())
    return Promise.resolve(rows as T[])
  } finally {
    stmt.free()
  }
}

export function run(sql: string, params: any[] = []) {
  const db = _db
  const stmt = db.prepare(sql)
  try {
    stmt.bind(params)
    stmt.step()
  } finally {
    stmt.free()
  }
} 
