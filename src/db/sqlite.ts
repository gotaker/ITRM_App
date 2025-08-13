import sqlite3InitModule from '@sqlite.org/sqlite-wasm'
let _db:any=null

function colExists(table:string, name:string){
  const stmt=_db.prepare(`PRAGMA table_info(${table})`)
  try{
    while(stmt.step()){
      const r=stmt.getAsObject() as any
      if((r.name||'').toLowerCase()===name.toLowerCase()) return true
    }
  } finally { stmt.free() }
  return false
}

export async function openDb(){
  if(_db) return _db
  const sqlite3=await sqlite3InitModule()
  _db=new sqlite3.oo1.DB('file:enterprise-risk.db?vfs=opfs')
  _db.exec(`BEGIN;
  CREATE TABLE IF NOT EXISTS app_settings (
    id INTEGER PRIMARY KEY CHECK(id=1),
    hero_url TEXT, hero_alt TEXT,
    what_md TEXT, why_md TEXT,
    how_enterprise_md TEXT, how_project_md TEXT,
    faq_json TEXT, github_repo_url TEXT,
    treatment_guidelines_md TEXT,
    appetite_bend REAL DEFAULT 0,
    green_max INTEGER DEFAULT 3,
    amber_max INTEGER DEFAULT 11,
    grid_cells INTEGER DEFAULT 4,
    default_top_n INTEGER DEFAULT 5,
    scatter_jitter REAL DEFAULT 0.0,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
  INSERT INTO app_settings (id) SELECT 1 WHERE NOT EXISTS (SELECT 1 FROM app_settings WHERE id=1);

  CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT UNIQUE, name TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
  CREATE TABLE IF NOT EXISTS projects (id TEXT PRIMARY KEY, name TEXT, code TEXT, active INTEGER DEFAULT 1, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
  CREATE TABLE IF NOT EXISTS project_members (project_id TEXT, user_id TEXT, role TEXT, PRIMARY KEY(project_id,user_id));

  CREATE TABLE IF NOT EXISTS risks (
    id TEXT PRIMARY KEY,
    project_id TEXT,
    title TEXT,
    code TEXT,
    category TEXT,
    status TEXT DEFAULT 'Open',
    owner_id TEXT,
    owner TEXT,
    perspective TEXT DEFAULT 'Project',
    mitigation_cost REAL,
    revision_info TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS assessments (
    id TEXT PRIMARY KEY,
    risk_id TEXT,
    phase TEXT CHECK(phase IN ('pre','post')),
    probability INTEGER,
    impact INTEGER,
    assessed_by TEXT,
    assessed_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS uploads (id TEXT PRIMARY KEY, name TEXT, mime TEXT, blob BLOB, meta TEXT, created_by TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);

  CREATE TABLE IF NOT EXISTS questions (
    id TEXT PRIMARY KEY,
    scope TEXT CHECK(scope IN ('Enterprise','Project')),
    category_code TEXT,
    risk_topic TEXT,
    question_text TEXT,
    description TEXT,
    info_url TEXT,
    treatment_examples TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
  COMMIT;`)

  const upgrades:[string,string,string][]= [
    ['risks','code','TEXT'],
    ['risks','owner','TEXT'],
    ['risks','mitigation_cost','REAL'],
    ['risks','revision_info','TEXT'],
    ['app_settings','default_top_n','INTEGER'],
    ['app_settings','scatter_jitter','REAL']
  ]
  for(const [t,c,typ] of upgrades){
    if(!colExists(t, c)){
      _db.exec(`ALTER TABLE ${t} ADD COLUMN ${c} ${typ}`)
    }
  }
  return _db
}

export function query<T=any>(sql:string, params:any[]=[]):T[]{
  const s=_db.prepare(sql)
  const out:any[]=[]
  try{ s.bind(params); while(s.step()) out.push(s.getAsObject()) } finally { s.free() }
  return out as T[]
}

export function run(sql:string, params:any[]=[]){
  const s=_db.prepare(sql)
  try{ s.bind(params); s.step() } finally { s.free() }
}
