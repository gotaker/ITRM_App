import {
  EASING,
  LitElement,
  __decorate,
  classMap,
  css,
  customElement,
  getFormValue,
  html,
  isServer,
  mixinElementInternals,
  mixinFormAssociated,
  nothing,
  property,
  query,
  queryAsync,
  redispatchEvent,
  requestUpdateOnAriaChange,
  state,
  styleMap
} from "./chunk-JCFU3UEM.js";
import "./chunk-DWA4UIM3.js";

// node_modules/@material/web/slider/internal/forced-colors-styles.js
var styles = css`@media(forced-colors: active){:host{--md-slider-active-track-color: CanvasText;--md-slider-disabled-active-track-color: GrayText;--md-slider-disabled-active-track-opacity: 1;--md-slider-disabled-handle-color: GrayText;--md-slider-disabled-inactive-track-color: GrayText;--md-slider-disabled-inactive-track-opacity: 1;--md-slider-focus-handle-color: CanvasText;--md-slider-handle-color: CanvasText;--md-slider-handle-shadow-color: Canvas;--md-slider-hover-handle-color: CanvasText;--md-slider-hover-state-layer-color: Canvas;--md-slider-hover-state-layer-opacity: 1;--md-slider-inactive-track-color: Canvas;--md-slider-label-container-color: Canvas;--md-slider-label-text-color: CanvasText;--md-slider-pressed-handle-color: CanvasText;--md-slider-pressed-state-layer-color: Canvas;--md-slider-pressed-state-layer-opacity: 1;--md-slider-with-overlap-handle-outline-color: CanvasText}.label,.label::before{border:var(--_with-overlap-handle-outline-color) solid var(--_with-overlap-handle-outline-width)}:host(:not([disabled])) .track::before{border:1px solid var(--_active-track-color)}.tickmarks::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='CanvasText'%3E%3Ccircle cx='2' cy='2'  r='1'/%3E%3C/svg%3E")}.tickmarks::after{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='Canvas'%3E%3Ccircle cx='2' cy='2' r='1'/%3E%3C/svg%3E")}:host([disabled]) .tickmarks::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='Canvas'%3E%3Ccircle cx='2' cy='2'  r='1'/%3E%3C/svg%3E")}}
`;

// node_modules/@material/web/elevation/internal/elevation.js
var Elevation = class extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("aria-hidden", "true");
  }
  render() {
    return html`<span class="shadow"></span>`;
  }
};

// node_modules/@material/web/elevation/internal/elevation-styles.js
var styles2 = css`:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}
`;

// node_modules/@material/web/elevation/elevation.js
var MdElevation = class MdElevation2 extends Elevation {
};
MdElevation.styles = [styles2];
MdElevation = __decorate([
  customElement("md-elevation")
], MdElevation);

// node_modules/@material/web/internal/controller/attachable-controller.js
var ATTACHABLE_CONTROLLER = Symbol("attachableController");
var FOR_ATTRIBUTE_OBSERVER;
if (!isServer) {
  FOR_ATTRIBUTE_OBSERVER = new MutationObserver((records) => {
    var _a;
    for (const record of records) {
      (_a = record.target[ATTACHABLE_CONTROLLER]) == null ? void 0 : _a.hostConnected();
    }
  });
}
var AttachableController = class {
  get htmlFor() {
    return this.host.getAttribute("for");
  }
  set htmlFor(htmlFor) {
    if (htmlFor === null) {
      this.host.removeAttribute("for");
    } else {
      this.host.setAttribute("for", htmlFor);
    }
  }
  get control() {
    if (this.host.hasAttribute("for")) {
      if (!this.htmlFor || !this.host.isConnected) {
        return null;
      }
      return this.host.getRootNode().querySelector(`#${this.htmlFor}`);
    }
    return this.currentControl || this.host.parentElement;
  }
  set control(control) {
    if (control) {
      this.attach(control);
    } else {
      this.detach();
    }
  }
  /**
   * Creates a new controller for an `Attachable` element.
   *
   * @param host The `Attachable` element.
   * @param onControlChange A callback with two parameters for the previous and
   *     next control. An `Attachable` element may perform setup or teardown
   *     logic whenever the control changes.
   */
  constructor(host, onControlChange) {
    this.host = host;
    this.onControlChange = onControlChange;
    this.currentControl = null;
    host.addController(this);
    host[ATTACHABLE_CONTROLLER] = this;
    FOR_ATTRIBUTE_OBSERVER == null ? void 0 : FOR_ATTRIBUTE_OBSERVER.observe(host, { attributeFilter: ["for"] });
  }
  attach(control) {
    if (control === this.currentControl) {
      return;
    }
    this.setCurrentControl(control);
    this.host.removeAttribute("for");
  }
  detach() {
    this.setCurrentControl(null);
    this.host.setAttribute("for", "");
  }
  /** @private */
  hostConnected() {
    this.setCurrentControl(this.control);
  }
  /** @private */
  hostDisconnected() {
    this.setCurrentControl(null);
  }
  setCurrentControl(control) {
    this.onControlChange(this.currentControl, control);
    this.currentControl = control;
  }
};

// node_modules/@material/web/focus/internal/focus-ring.js
var EVENTS = ["focusin", "focusout", "pointerdown"];
var FocusRing = class extends LitElement {
  constructor() {
    super(...arguments);
    this.visible = false;
    this.inward = false;
    this.attachableController = new AttachableController(this, this.onControlChange.bind(this));
  }
  get htmlFor() {
    return this.attachableController.htmlFor;
  }
  set htmlFor(htmlFor) {
    this.attachableController.htmlFor = htmlFor;
  }
  get control() {
    return this.attachableController.control;
  }
  set control(control) {
    this.attachableController.control = control;
  }
  attach(control) {
    this.attachableController.attach(control);
  }
  detach() {
    this.attachableController.detach();
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("aria-hidden", "true");
  }
  /** @private */
  handleEvent(event) {
    var _a;
    if (event[HANDLED_BY_FOCUS_RING]) {
      return;
    }
    switch (event.type) {
      default:
        return;
      case "focusin":
        this.visible = ((_a = this.control) == null ? void 0 : _a.matches(":focus-visible")) ?? false;
        break;
      case "focusout":
      case "pointerdown":
        this.visible = false;
        break;
    }
    event[HANDLED_BY_FOCUS_RING] = true;
  }
  onControlChange(prev, next) {
    if (isServer)
      return;
    for (const event of EVENTS) {
      prev == null ? void 0 : prev.removeEventListener(event, this);
      next == null ? void 0 : next.addEventListener(event, this);
    }
  }
  update(changed) {
    if (changed.has("visible")) {
      this.dispatchEvent(new Event("visibility-changed"));
    }
    super.update(changed);
  }
};
__decorate([
  property({ type: Boolean, reflect: true })
], FocusRing.prototype, "visible", void 0);
__decorate([
  property({ type: Boolean, reflect: true })
], FocusRing.prototype, "inward", void 0);
var HANDLED_BY_FOCUS_RING = Symbol("handledByFocusRing");

// node_modules/@material/web/focus/internal/focus-ring-styles.js
var styles3 = css`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}
`;

// node_modules/@material/web/focus/md-focus-ring.js
var MdFocusRing = class MdFocusRing2 extends FocusRing {
};
MdFocusRing.styles = [styles3];
MdFocusRing = __decorate([
  customElement("md-focus-ring")
], MdFocusRing);

// node_modules/@material/web/ripple/internal/ripple.js
var PRESS_GROW_MS = 450;
var MINIMUM_PRESS_MS = 225;
var INITIAL_ORIGIN_SCALE = 0.2;
var PADDING = 10;
var SOFT_EDGE_MINIMUM_SIZE = 75;
var SOFT_EDGE_CONTAINER_RATIO = 0.35;
var PRESS_PSEUDO = "::after";
var ANIMATION_FILL = "forwards";
var State;
(function(State2) {
  State2[State2["INACTIVE"] = 0] = "INACTIVE";
  State2[State2["TOUCH_DELAY"] = 1] = "TOUCH_DELAY";
  State2[State2["HOLDING"] = 2] = "HOLDING";
  State2[State2["WAITING_FOR_CLICK"] = 3] = "WAITING_FOR_CLICK";
})(State || (State = {}));
var EVENTS2 = [
  "click",
  "contextmenu",
  "pointercancel",
  "pointerdown",
  "pointerenter",
  "pointerleave",
  "pointerup"
];
var TOUCH_DELAY_MS = 150;
var FORCED_COLORS = isServer ? null : window.matchMedia("(forced-colors: active)");
var Ripple = class extends LitElement {
  constructor() {
    super(...arguments);
    this.disabled = false;
    this.hovered = false;
    this.pressed = false;
    this.rippleSize = "";
    this.rippleScale = "";
    this.initialSize = 0;
    this.state = State.INACTIVE;
    this.checkBoundsAfterContextMenu = false;
    this.attachableController = new AttachableController(this, this.onControlChange.bind(this));
  }
  get htmlFor() {
    return this.attachableController.htmlFor;
  }
  set htmlFor(htmlFor) {
    this.attachableController.htmlFor = htmlFor;
  }
  get control() {
    return this.attachableController.control;
  }
  set control(control) {
    this.attachableController.control = control;
  }
  attach(control) {
    this.attachableController.attach(control);
  }
  detach() {
    this.attachableController.detach();
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("aria-hidden", "true");
  }
  render() {
    const classes = {
      "hovered": this.hovered,
      "pressed": this.pressed
    };
    return html`<div class="surface ${classMap(classes)}"></div>`;
  }
  update(changedProps) {
    if (changedProps.has("disabled") && this.disabled) {
      this.hovered = false;
      this.pressed = false;
    }
    super.update(changedProps);
  }
  /**
   * TODO(b/269799771): make private
   * @private only public for slider
   */
  handlePointerenter(event) {
    if (!this.shouldReactToEvent(event)) {
      return;
    }
    this.hovered = true;
  }
  /**
   * TODO(b/269799771): make private
   * @private only public for slider
   */
  handlePointerleave(event) {
    if (!this.shouldReactToEvent(event)) {
      return;
    }
    this.hovered = false;
    if (this.state !== State.INACTIVE) {
      this.endPressAnimation();
    }
  }
  handlePointerup(event) {
    if (!this.shouldReactToEvent(event)) {
      return;
    }
    if (this.state === State.HOLDING) {
      this.state = State.WAITING_FOR_CLICK;
      return;
    }
    if (this.state === State.TOUCH_DELAY) {
      this.state = State.WAITING_FOR_CLICK;
      this.startPressAnimation(this.rippleStartEvent);
      return;
    }
  }
  async handlePointerdown(event) {
    if (!this.shouldReactToEvent(event)) {
      return;
    }
    this.rippleStartEvent = event;
    if (!this.isTouch(event)) {
      this.state = State.WAITING_FOR_CLICK;
      this.startPressAnimation(event);
      return;
    }
    if (this.checkBoundsAfterContextMenu && !this.inBounds(event)) {
      return;
    }
    this.checkBoundsAfterContextMenu = false;
    this.state = State.TOUCH_DELAY;
    await new Promise((resolve) => {
      setTimeout(resolve, TOUCH_DELAY_MS);
    });
    if (this.state !== State.TOUCH_DELAY) {
      return;
    }
    this.state = State.HOLDING;
    this.startPressAnimation(event);
  }
  handleClick() {
    if (this.disabled) {
      return;
    }
    if (this.state === State.WAITING_FOR_CLICK) {
      this.endPressAnimation();
      return;
    }
    if (this.state === State.INACTIVE) {
      this.startPressAnimation();
      this.endPressAnimation();
    }
  }
  handlePointercancel(event) {
    if (!this.shouldReactToEvent(event)) {
      return;
    }
    this.endPressAnimation();
  }
  handleContextmenu() {
    if (this.disabled) {
      return;
    }
    this.checkBoundsAfterContextMenu = true;
    this.endPressAnimation();
  }
  determineRippleSize() {
    const { height, width } = this.getBoundingClientRect();
    const maxDim = Math.max(height, width);
    const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);
    const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
    const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
    const maxRadius = hypotenuse + PADDING;
    this.initialSize = initialSize;
    this.rippleScale = `${(maxRadius + softEdgeSize) / initialSize}`;
    this.rippleSize = `${initialSize}px`;
  }
  getNormalizedPointerEventCoords(pointerEvent) {
    const { scrollX, scrollY } = window;
    const { left, top } = this.getBoundingClientRect();
    const documentX = scrollX + left;
    const documentY = scrollY + top;
    const { pageX, pageY } = pointerEvent;
    return { x: pageX - documentX, y: pageY - documentY };
  }
  getTranslationCoordinates(positionEvent) {
    const { height, width } = this.getBoundingClientRect();
    const endPoint = {
      x: (width - this.initialSize) / 2,
      y: (height - this.initialSize) / 2
    };
    let startPoint;
    if (positionEvent instanceof PointerEvent) {
      startPoint = this.getNormalizedPointerEventCoords(positionEvent);
    } else {
      startPoint = {
        x: width / 2,
        y: height / 2
      };
    }
    startPoint = {
      x: startPoint.x - this.initialSize / 2,
      y: startPoint.y - this.initialSize / 2
    };
    return { startPoint, endPoint };
  }
  startPressAnimation(positionEvent) {
    var _a;
    if (!this.mdRoot) {
      return;
    }
    this.pressed = true;
    (_a = this.growAnimation) == null ? void 0 : _a.cancel();
    this.determineRippleSize();
    const { startPoint, endPoint } = this.getTranslationCoordinates(positionEvent);
    const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
    const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
    this.growAnimation = this.mdRoot.animate({
      top: [0, 0],
      left: [0, 0],
      height: [this.rippleSize, this.rippleSize],
      width: [this.rippleSize, this.rippleSize],
      transform: [
        `translate(${translateStart}) scale(1)`,
        `translate(${translateEnd}) scale(${this.rippleScale})`
      ]
    }, {
      pseudoElement: PRESS_PSEUDO,
      duration: PRESS_GROW_MS,
      easing: EASING.STANDARD,
      fill: ANIMATION_FILL
    });
  }
  async endPressAnimation() {
    this.rippleStartEvent = void 0;
    this.state = State.INACTIVE;
    const animation = this.growAnimation;
    let pressAnimationPlayState = Infinity;
    if (typeof (animation == null ? void 0 : animation.currentTime) === "number") {
      pressAnimationPlayState = animation.currentTime;
    } else if (animation == null ? void 0 : animation.currentTime) {
      pressAnimationPlayState = animation.currentTime.to("ms").value;
    }
    if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
      this.pressed = false;
      return;
    }
    await new Promise((resolve) => {
      setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState);
    });
    if (this.growAnimation !== animation) {
      return;
    }
    this.pressed = false;
  }
  /**
   * Returns `true` if
   *  - the ripple element is enabled
   *  - the pointer is primary for the input type
   *  - the pointer is the pointer that started the interaction, or will start
   * the interaction
   *  - the pointer is a touch, or the pointer state has the primary button
   * held, or the pointer is hovering
   */
  shouldReactToEvent(event) {
    if (this.disabled || !event.isPrimary) {
      return false;
    }
    if (this.rippleStartEvent && this.rippleStartEvent.pointerId !== event.pointerId) {
      return false;
    }
    if (event.type === "pointerenter" || event.type === "pointerleave") {
      return !this.isTouch(event);
    }
    const isPrimaryButton = event.buttons === 1;
    return this.isTouch(event) || isPrimaryButton;
  }
  /**
   * Check if the event is within the bounds of the element.
   *
   * This is only needed for the "stuck" contextmenu longpress on Chrome.
   */
  inBounds({ x, y }) {
    const { top, left, bottom, right } = this.getBoundingClientRect();
    return x >= left && x <= right && y >= top && y <= bottom;
  }
  isTouch({ pointerType }) {
    return pointerType === "touch";
  }
  /** @private */
  async handleEvent(event) {
    if (FORCED_COLORS == null ? void 0 : FORCED_COLORS.matches) {
      return;
    }
    switch (event.type) {
      case "click":
        this.handleClick();
        break;
      case "contextmenu":
        this.handleContextmenu();
        break;
      case "pointercancel":
        this.handlePointercancel(event);
        break;
      case "pointerdown":
        await this.handlePointerdown(event);
        break;
      case "pointerenter":
        this.handlePointerenter(event);
        break;
      case "pointerleave":
        this.handlePointerleave(event);
        break;
      case "pointerup":
        this.handlePointerup(event);
        break;
      default:
        break;
    }
  }
  onControlChange(prev, next) {
    if (isServer)
      return;
    for (const event of EVENTS2) {
      prev == null ? void 0 : prev.removeEventListener(event, this);
      next == null ? void 0 : next.addEventListener(event, this);
    }
  }
};
__decorate([
  property({ type: Boolean, reflect: true })
], Ripple.prototype, "disabled", void 0);
__decorate([
  state()
], Ripple.prototype, "hovered", void 0);
__decorate([
  state()
], Ripple.prototype, "pressed", void 0);
__decorate([
  query(".surface")
], Ripple.prototype, "mdRoot", void 0);

// node_modules/@material/web/ripple/internal/ripple-styles.js
var styles4 = css`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`;

// node_modules/@material/web/ripple/ripple.js
var MdRipple = class MdRipple2 extends Ripple {
};
MdRipple.styles = [styles4];
MdRipple = __decorate([
  customElement("md-ripple")
], MdRipple);

// node_modules/lit-html/development/directives/when.js
function when(condition, trueCase, falseCase) {
  return condition ? trueCase(condition) : falseCase == null ? void 0 : falseCase(condition);
}

// node_modules/@material/web/internal/events/form-label-activation.js
function dispatchActivationClick(element) {
  const event = new MouseEvent("click", { bubbles: true });
  element.dispatchEvent(event);
  return event;
}
function isActivationClick(event) {
  if (event.currentTarget !== event.target) {
    return false;
  }
  if (event.composedPath()[0] !== event.target) {
    return false;
  }
  if (event.target.disabled) {
    return false;
  }
  return !squelchEvent(event);
}
function squelchEvent(event) {
  const squelched = isSquelchingEvents;
  if (squelched) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
  squelchEventsForMicrotask();
  return squelched;
}
var isSquelchingEvents = false;
async function squelchEventsForMicrotask() {
  isSquelchingEvents = true;
  await null;
  isSquelchingEvents = false;
}

// node_modules/@material/web/slider/internal/slider.js
var sliderBaseClass = mixinFormAssociated(mixinElementInternals(LitElement));
var Slider = class extends sliderBaseClass {
  /**
   * The HTML name to use in form submission for a range slider's starting
   * value. Use `name` instead if both the start and end values should use the
   * same name.
   */
  get nameStart() {
    return this.getAttribute("name-start") ?? this.name;
  }
  set nameStart(name) {
    this.setAttribute("name-start", name);
  }
  /**
   * The HTML name to use in form submission for a range slider's ending value.
   * Use `name` instead if both the start and end values should use the same
   * name.
   */
  get nameEnd() {
    return this.getAttribute("name-end") ?? this.nameStart;
  }
  set nameEnd(name) {
    this.setAttribute("name-end", name);
  }
  // Note: start aria-* properties are only applied when range=true, which is
  // why they do not need to handle both cases.
  get renderAriaLabelStart() {
    const { ariaLabel } = this;
    return this.ariaLabelStart || ariaLabel && `${ariaLabel} start` || this.valueLabelStart || String(this.valueStart);
  }
  get renderAriaValueTextStart() {
    return this.ariaValueTextStart || this.valueLabelStart || String(this.valueStart);
  }
  // Note: end aria-* properties are applied for single and range sliders, which
  // is why it needs to handle `this.range` (while start aria-* properties do
  // not).
  get renderAriaLabelEnd() {
    const { ariaLabel } = this;
    if (this.range) {
      return this.ariaLabelEnd || ariaLabel && `${ariaLabel} end` || this.valueLabelEnd || String(this.valueEnd);
    }
    return ariaLabel || this.valueLabel || String(this.value);
  }
  get renderAriaValueTextEnd() {
    if (this.range) {
      return this.ariaValueTextEnd || this.valueLabelEnd || String(this.valueEnd);
    }
    const { ariaValueText } = this;
    return ariaValueText || this.valueLabel || String(this.value);
  }
  constructor() {
    super();
    this.min = 0;
    this.max = 100;
    this.valueLabel = "";
    this.valueLabelStart = "";
    this.valueLabelEnd = "";
    this.ariaLabelStart = "";
    this.ariaValueTextStart = "";
    this.ariaLabelEnd = "";
    this.ariaValueTextEnd = "";
    this.step = 1;
    this.ticks = false;
    this.labeled = false;
    this.range = false;
    this.handleStartHover = false;
    this.handleEndHover = false;
    this.startOnTop = false;
    this.handlesOverlapping = false;
    this.ripplePointerId = 1;
    this.isRedispatchingEvent = false;
    if (!isServer) {
      this.addEventListener("click", (event) => {
        if (!isActivationClick(event) || !this.inputEnd) {
          return;
        }
        this.focus();
        dispatchActivationClick(this.inputEnd);
      });
    }
  }
  focus() {
    var _a;
    (_a = this.inputEnd) == null ? void 0 : _a.focus();
  }
  willUpdate(changed) {
    var _a, _b;
    this.renderValueStart = changed.has("valueStart") ? this.valueStart : (_a = this.inputStart) == null ? void 0 : _a.valueAsNumber;
    const endValueChanged = changed.has("valueEnd") && this.range || changed.has("value");
    this.renderValueEnd = endValueChanged ? this.range ? this.valueEnd : this.value : (_b = this.inputEnd) == null ? void 0 : _b.valueAsNumber;
    if (changed.get("handleStartHover") !== void 0) {
      this.toggleRippleHover(this.rippleStart, this.handleStartHover);
    } else if (changed.get("handleEndHover") !== void 0) {
      this.toggleRippleHover(this.rippleEnd, this.handleEndHover);
    }
  }
  updated(changed) {
    var _a, _b;
    if (this.range) {
      this.renderValueStart = this.inputStart.valueAsNumber;
    }
    this.renderValueEnd = this.inputEnd.valueAsNumber;
    if (this.range) {
      const segment = (this.max - this.min) / 3;
      if (this.valueStart === void 0) {
        this.inputStart.valueAsNumber = this.min + segment;
        const v = this.inputStart.valueAsNumber;
        this.valueStart = this.renderValueStart = v;
      }
      if (this.valueEnd === void 0) {
        this.inputEnd.valueAsNumber = this.min + 2 * segment;
        const v = this.inputEnd.valueAsNumber;
        this.valueEnd = this.renderValueEnd = v;
      }
    } else {
      this.value ?? (this.value = this.renderValueEnd);
    }
    if (changed.has("range") || changed.has("renderValueStart") || changed.has("renderValueEnd") || this.isUpdatePending) {
      const startNub = (_a = this.handleStart) == null ? void 0 : _a.querySelector(".handleNub");
      const endNub = (_b = this.handleEnd) == null ? void 0 : _b.querySelector(".handleNub");
      this.handlesOverlapping = isOverlapping(startNub, endNub);
    }
    this.performUpdate();
  }
  render() {
    const step = this.step === 0 ? 1 : this.step;
    const range = Math.max(this.max - this.min, step);
    const startFraction = this.range ? ((this.renderValueStart ?? this.min) - this.min) / range : 0;
    const endFraction = ((this.renderValueEnd ?? this.min) - this.min) / range;
    const containerStyles = {
      // for clipping inputs and active track.
      "--_start-fraction": String(startFraction),
      "--_end-fraction": String(endFraction),
      // for generating tick marks
      "--_tick-count": String(range / step)
    };
    const containerClasses = { ranged: this.range };
    const labelStart = this.valueLabelStart || String(this.renderValueStart);
    const labelEnd = (this.range ? this.valueLabelEnd : this.valueLabel) || String(this.renderValueEnd);
    const inputStartProps = {
      start: true,
      value: this.renderValueStart,
      ariaLabel: this.renderAriaLabelStart,
      ariaValueText: this.renderAriaValueTextStart,
      ariaMin: this.min,
      ariaMax: this.valueEnd ?? this.max
    };
    const inputEndProps = {
      start: false,
      value: this.renderValueEnd,
      ariaLabel: this.renderAriaLabelEnd,
      ariaValueText: this.renderAriaValueTextEnd,
      ariaMin: this.range ? this.valueStart ?? this.min : this.min,
      ariaMax: this.max
    };
    const handleStartProps = {
      start: true,
      hover: this.handleStartHover,
      label: labelStart
    };
    const handleEndProps = {
      start: false,
      hover: this.handleEndHover,
      label: labelEnd
    };
    const handleContainerClasses = {
      hover: this.handleStartHover || this.handleEndHover
    };
    return html` <div
      class="container ${classMap(containerClasses)}"
      style=${styleMap(containerStyles)}>
      ${when(this.range, () => this.renderInput(inputStartProps))}
      ${this.renderInput(inputEndProps)} ${this.renderTrack()}
      <div class="handleContainerPadded">
        <div class="handleContainerBlock">
          <div class="handleContainer ${classMap(handleContainerClasses)}">
            ${when(this.range, () => this.renderHandle(handleStartProps))}
            ${this.renderHandle(handleEndProps)}
          </div>
        </div>
      </div>
    </div>`;
  }
  renderTrack() {
    return html`
      <div class="track"></div>
      ${this.ticks ? html`<div class="tickmarks"></div>` : nothing}
    `;
  }
  renderLabel(value) {
    return html`<div class="label" aria-hidden="true">
      <span class="labelContent" part="label">${value}</span>
    </div>`;
  }
  renderHandle({ start, hover, label }) {
    const onTop = !this.disabled && start === this.startOnTop;
    const isOverlapping2 = !this.disabled && this.handlesOverlapping;
    const name = start ? "start" : "end";
    return html`<div
      class="handle ${classMap({
      [name]: true,
      hover,
      onTop,
      isOverlapping: isOverlapping2
    })}">
      <md-focus-ring part="focus-ring" for=${name}></md-focus-ring>
      <md-ripple
        for=${name}
        class=${name}
        ?disabled=${this.disabled}></md-ripple>
      <div class="handleNub">
        <md-elevation part="elevation"></md-elevation>
      </div>
      ${when(this.labeled, () => this.renderLabel(label))}
    </div>`;
  }
  renderInput({ start, value, ariaLabel, ariaValueText, ariaMin, ariaMax }) {
    const name = start ? `start` : `end`;
    return html`<input
      type="range"
      class="${classMap({
      start,
      end: !start
    })}"
      @focus=${this.handleFocus}
      @pointerdown=${this.handleDown}
      @pointerup=${this.handleUp}
      @pointerenter=${this.handleEnter}
      @pointermove=${this.handleMove}
      @pointerleave=${this.handleLeave}
      @keydown=${this.handleKeydown}
      @keyup=${this.handleKeyup}
      @input=${this.handleInput}
      @change=${this.handleChange}
      id=${name}
      .disabled=${this.disabled}
      .min=${String(this.min)}
      aria-valuemin=${ariaMin}
      .max=${String(this.max)}
      aria-valuemax=${ariaMax}
      .step=${String(this.step)}
      .value=${String(value)}
      .tabIndex=${start ? 1 : 0}
      aria-label=${ariaLabel || nothing}
      aria-valuetext=${ariaValueText} />`;
  }
  async toggleRippleHover(ripple, hovering) {
    const rippleEl = await ripple;
    if (!rippleEl) {
      return;
    }
    if (hovering) {
      rippleEl.handlePointerenter(new PointerEvent("pointerenter", {
        isPrimary: true,
        pointerId: this.ripplePointerId
      }));
    } else {
      rippleEl.handlePointerleave(new PointerEvent("pointerleave", {
        isPrimary: true,
        pointerId: this.ripplePointerId
      }));
    }
  }
  handleFocus(event) {
    this.updateOnTop(event.target);
  }
  startAction(event) {
    const target = event.target;
    const fixed = target === this.inputStart ? this.inputEnd : this.inputStart;
    this.action = {
      canFlip: event.type === "pointerdown",
      flipped: false,
      target,
      fixed,
      values: /* @__PURE__ */ new Map([
        [target, target.valueAsNumber],
        [fixed, fixed == null ? void 0 : fixed.valueAsNumber]
      ])
    };
  }
  finishAction(event) {
    this.action = void 0;
  }
  handleKeydown(event) {
    this.startAction(event);
  }
  handleKeyup(event) {
    this.finishAction(event);
  }
  handleDown(event) {
    this.startAction(event);
    this.ripplePointerId = event.pointerId;
    const isStart = event.target === this.inputStart;
    this.handleStartHover = !this.disabled && isStart && Boolean(this.handleStart);
    this.handleEndHover = !this.disabled && !isStart && Boolean(this.handleEnd);
  }
  async handleUp(event) {
    if (!this.action) {
      return;
    }
    const { target, values, flipped } = this.action;
    await new Promise(requestAnimationFrame);
    if (target !== void 0) {
      target.focus();
      if (flipped && target.valueAsNumber !== values.get(target)) {
        target.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
    this.finishAction(event);
  }
  /**
   * The move handler tracks handle hovering to facilitate proper ripple
   * behavior on the slider handle. This is needed because user interaction with
   * the native input is leveraged to position the handle. Because the separate
   * displayed handle element has pointer events disabled (to allow interaction
   * with the input) and the input's handle is a pseudo-element, neither can be
   * the ripple's interactive element. Therefore the input is the ripple's
   * interactive element and has a `ripple` directive; however the ripple
   * is gated on the handle being hovered. In addition, because the ripple
   * hover state is being specially handled, it must be triggered independent
   * of the directive. This is done based on the hover state when the
   * slider is updated.
   */
  handleMove(event) {
    this.handleStartHover = !this.disabled && inBounds(event, this.handleStart);
    this.handleEndHover = !this.disabled && inBounds(event, this.handleEnd);
  }
  handleEnter(event) {
    this.handleMove(event);
  }
  handleLeave() {
    this.handleStartHover = false;
    this.handleEndHover = false;
  }
  updateOnTop(input) {
    this.startOnTop = input.classList.contains("start");
  }
  needsClamping() {
    if (!this.action) {
      return false;
    }
    const { target, fixed } = this.action;
    const isStart = target === this.inputStart;
    return isStart ? target.valueAsNumber > fixed.valueAsNumber : target.valueAsNumber < fixed.valueAsNumber;
  }
  // if start/end start coincident and the first drag input would e.g. move
  // start > end, avoid clamping and "flip" to use the other input
  // as the action target.
  isActionFlipped() {
    const { action } = this;
    if (!action) {
      return false;
    }
    const { target, fixed, values } = action;
    if (action.canFlip) {
      const coincident = values.get(target) === values.get(fixed);
      if (coincident && this.needsClamping()) {
        action.canFlip = false;
        action.flipped = true;
        action.target = fixed;
        action.fixed = target;
      }
    }
    return action.flipped;
  }
  // when flipped, apply the drag input to the flipped target and reset
  // the actual target.
  flipAction() {
    if (!this.action) {
      return false;
    }
    const { target, fixed, values } = this.action;
    const changed = target.valueAsNumber !== fixed.valueAsNumber;
    target.valueAsNumber = fixed.valueAsNumber;
    fixed.valueAsNumber = values.get(fixed);
    return changed;
  }
  // clamp such that start does not move beyond end and visa versa.
  clampAction() {
    if (!this.needsClamping() || !this.action) {
      return false;
    }
    const { target, fixed } = this.action;
    target.valueAsNumber = fixed.valueAsNumber;
    return true;
  }
  handleInput(event) {
    if (this.isRedispatchingEvent) {
      return;
    }
    let stopPropagation = false;
    let redispatch = false;
    if (this.range) {
      if (this.isActionFlipped()) {
        stopPropagation = true;
        redispatch = this.flipAction();
      }
      if (this.clampAction()) {
        stopPropagation = true;
        redispatch = false;
      }
    }
    const target = event.target;
    this.updateOnTop(target);
    if (this.range) {
      this.valueStart = this.inputStart.valueAsNumber;
      this.valueEnd = this.inputEnd.valueAsNumber;
    } else {
      this.value = this.inputEnd.valueAsNumber;
    }
    if (stopPropagation) {
      event.stopPropagation();
    }
    if (redispatch) {
      this.isRedispatchingEvent = true;
      redispatchEvent(target, event);
      this.isRedispatchingEvent = false;
    }
  }
  handleChange(event) {
    const changeTarget = event.target;
    const { target, values } = this.action ?? {};
    const squelch = target && target.valueAsNumber === values.get(changeTarget);
    if (!squelch) {
      redispatchEvent(this, event);
    }
    this.finishAction(event);
  }
  [getFormValue]() {
    if (this.range) {
      const data = new FormData();
      data.append(this.nameStart, String(this.valueStart));
      data.append(this.nameEnd, String(this.valueEnd));
      return data;
    }
    return String(this.value);
  }
  formResetCallback() {
    if (this.range) {
      const valueStart = this.getAttribute("value-start");
      this.valueStart = valueStart !== null ? Number(valueStart) : void 0;
      const valueEnd = this.getAttribute("value-end");
      this.valueEnd = valueEnd !== null ? Number(valueEnd) : void 0;
      return;
    }
    const value = this.getAttribute("value");
    this.value = value !== null ? Number(value) : void 0;
  }
  formStateRestoreCallback(state2) {
    if (Array.isArray(state2)) {
      const [[, valueStart], [, valueEnd]] = state2;
      this.valueStart = Number(valueStart);
      this.valueEnd = Number(valueEnd);
      this.range = true;
      return;
    }
    this.value = Number(state2);
    this.range = false;
  }
};
(() => {
  requestUpdateOnAriaChange(Slider);
})();
Slider.shadowRootOptions = {
  ...LitElement.shadowRootOptions,
  delegatesFocus: true
};
__decorate([
  property({ type: Number })
], Slider.prototype, "min", void 0);
__decorate([
  property({ type: Number })
], Slider.prototype, "max", void 0);
__decorate([
  property({ type: Number })
], Slider.prototype, "value", void 0);
__decorate([
  property({ type: Number, attribute: "value-start" })
], Slider.prototype, "valueStart", void 0);
__decorate([
  property({ type: Number, attribute: "value-end" })
], Slider.prototype, "valueEnd", void 0);
__decorate([
  property({ attribute: "value-label" })
], Slider.prototype, "valueLabel", void 0);
__decorate([
  property({ attribute: "value-label-start" })
], Slider.prototype, "valueLabelStart", void 0);
__decorate([
  property({ attribute: "value-label-end" })
], Slider.prototype, "valueLabelEnd", void 0);
__decorate([
  property({ attribute: "aria-label-start" })
], Slider.prototype, "ariaLabelStart", void 0);
__decorate([
  property({ attribute: "aria-valuetext-start" })
], Slider.prototype, "ariaValueTextStart", void 0);
__decorate([
  property({ attribute: "aria-label-end" })
], Slider.prototype, "ariaLabelEnd", void 0);
__decorate([
  property({ attribute: "aria-valuetext-end" })
], Slider.prototype, "ariaValueTextEnd", void 0);
__decorate([
  property({ type: Number })
], Slider.prototype, "step", void 0);
__decorate([
  property({ type: Boolean })
], Slider.prototype, "ticks", void 0);
__decorate([
  property({ type: Boolean })
], Slider.prototype, "labeled", void 0);
__decorate([
  property({ type: Boolean })
], Slider.prototype, "range", void 0);
__decorate([
  query("input.start")
], Slider.prototype, "inputStart", void 0);
__decorate([
  query(".handle.start")
], Slider.prototype, "handleStart", void 0);
__decorate([
  queryAsync("md-ripple.start")
], Slider.prototype, "rippleStart", void 0);
__decorate([
  query("input.end")
], Slider.prototype, "inputEnd", void 0);
__decorate([
  query(".handle.end")
], Slider.prototype, "handleEnd", void 0);
__decorate([
  queryAsync("md-ripple.end")
], Slider.prototype, "rippleEnd", void 0);
__decorate([
  state()
], Slider.prototype, "handleStartHover", void 0);
__decorate([
  state()
], Slider.prototype, "handleEndHover", void 0);
__decorate([
  state()
], Slider.prototype, "startOnTop", void 0);
__decorate([
  state()
], Slider.prototype, "handlesOverlapping", void 0);
__decorate([
  state()
], Slider.prototype, "renderValueStart", void 0);
__decorate([
  state()
], Slider.prototype, "renderValueEnd", void 0);
function inBounds({ x, y }, element) {
  if (!element) {
    return false;
  }
  const { top, left, bottom, right } = element.getBoundingClientRect();
  return x >= left && x <= right && y >= top && y <= bottom;
}
function isOverlapping(elA, elB) {
  if (!(elA && elB)) {
    return false;
  }
  const a = elA.getBoundingClientRect();
  const b = elB.getBoundingClientRect();
  return !(a.top > b.bottom || a.right < b.left || a.bottom < b.top || a.left > b.right);
}

// node_modules/@material/web/slider/internal/slider-styles.js
var styles5 = css`:host{--_active-track-color: var(--md-slider-active-track-color, var(--md-sys-color-primary, #6750a4));--_active-track-height: var(--md-slider-active-track-height, 4px);--_active-track-shape: var(--md-slider-active-track-shape, var(--md-sys-shape-corner-full, 9999px));--_disabled-active-track-color: var(--md-slider-disabled-active-track-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-track-opacity: var(--md-slider-disabled-active-track-opacity, 0.38);--_disabled-handle-color: var(--md-slider-disabled-handle-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-handle-elevation: var(--md-slider-disabled-handle-elevation, 0);--_disabled-inactive-track-color: var(--md-slider-disabled-inactive-track-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-inactive-track-opacity: var(--md-slider-disabled-inactive-track-opacity, 0.12);--_focus-handle-color: var(--md-slider-focus-handle-color, var(--md-sys-color-primary, #6750a4));--_handle-color: var(--md-slider-handle-color, var(--md-sys-color-primary, #6750a4));--_handle-elevation: var(--md-slider-handle-elevation, 1);--_handle-height: var(--md-slider-handle-height, 20px);--_handle-shadow-color: var(--md-slider-handle-shadow-color, var(--md-sys-color-shadow, #000));--_handle-shape: var(--md-slider-handle-shape, var(--md-sys-shape-corner-full, 9999px));--_handle-width: var(--md-slider-handle-width, 20px);--_hover-handle-color: var(--md-slider-hover-handle-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-slider-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-slider-hover-state-layer-opacity, 0.08);--_inactive-track-color: var(--md-slider-inactive-track-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_inactive-track-height: var(--md-slider-inactive-track-height, 4px);--_inactive-track-shape: var(--md-slider-inactive-track-shape, var(--md-sys-shape-corner-full, 9999px));--_label-container-color: var(--md-slider-label-container-color, var(--md-sys-color-primary, #6750a4));--_label-container-height: var(--md-slider-label-container-height, 28px);--_pressed-handle-color: var(--md-slider-pressed-handle-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-slider-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-slider-pressed-state-layer-opacity, 0.12);--_state-layer-size: var(--md-slider-state-layer-size, 40px);--_with-overlap-handle-outline-color: var(--md-slider-with-overlap-handle-outline-color, var(--md-sys-color-on-primary, #fff));--_with-overlap-handle-outline-width: var(--md-slider-with-overlap-handle-outline-width, 1px);--_with-tick-marks-active-container-color: var(--md-slider-with-tick-marks-active-container-color, var(--md-sys-color-on-primary, #fff));--_with-tick-marks-container-size: var(--md-slider-with-tick-marks-container-size, 2px);--_with-tick-marks-disabled-container-color: var(--md-slider-with-tick-marks-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_with-tick-marks-inactive-container-color: var(--md-slider-with-tick-marks-inactive-container-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-slider-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-slider-label-text-font, var(--md-sys-typescale-label-medium-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-slider-label-text-line-height, var(--md-sys-typescale-label-medium-line-height, 1rem));--_label-text-size: var(--md-slider-label-text-size, var(--md-sys-typescale-label-medium-size, 0.75rem));--_label-text-weight: var(--md-slider-label-text-weight, var(--md-sys-typescale-label-medium-weight, var(--md-ref-typeface-weight-medium, 500)));--_start-fraction: 0;--_end-fraction: 0;--_tick-count: 0;display:inline-flex;vertical-align:middle;min-inline-size:200px;--md-elevation-level: var(--_handle-elevation);--md-elevation-shadow-color: var(--_handle-shadow-color)}md-focus-ring{height:48px;inset:unset;width:48px}md-elevation{transition-duration:250ms}@media(prefers-reduced-motion){.label{transition-duration:0}}:host([disabled]){opacity:var(--_disabled-active-track-opacity);--md-elevation-level: var(--_disabled-handle-elevation)}.container{flex:1;display:flex;align-items:center;position:relative;block-size:var(--_state-layer-size);pointer-events:none;touch-action:none}.track,.tickmarks{position:absolute;inset:0;display:flex;align-items:center}.track::before,.tickmarks::before,.track::after,.tickmarks::after{position:absolute;content:"";inset-inline-start:calc(var(--_state-layer-size)/2 - var(--_with-tick-marks-container-size));inset-inline-end:calc(var(--_state-layer-size)/2 - var(--_with-tick-marks-container-size));background-size:calc((100% - var(--_with-tick-marks-container-size)*2)/var(--_tick-count)) 100%}.track::before,.tickmarks::before{block-size:var(--_inactive-track-height);border-radius:var(--_inactive-track-shape)}.track::before{background:var(--_inactive-track-color)}.tickmarks::before{background-image:radial-gradient(circle at var(--_with-tick-marks-container-size) center, var(--_with-tick-marks-inactive-container-color) 0, var(--_with-tick-marks-inactive-container-color) calc(var(--_with-tick-marks-container-size) / 2), transparent calc(var(--_with-tick-marks-container-size) / 2))}:host([disabled]) .track::before{opacity:calc(1/var(--_disabled-active-track-opacity)*var(--_disabled-inactive-track-opacity));background:var(--_disabled-inactive-track-color)}.track::after,.tickmarks::after{block-size:var(--_active-track-height);border-radius:var(--_active-track-shape);clip-path:inset(0 calc(var(--_with-tick-marks-container-size) * min((1 - var(--_end-fraction)) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * (1 - var(--_end-fraction))) 0 calc(var(--_with-tick-marks-container-size) * min(var(--_start-fraction) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * var(--_start-fraction)))}.track::after{background:var(--_active-track-color)}.tickmarks::after{background-image:radial-gradient(circle at var(--_with-tick-marks-container-size) center, var(--_with-tick-marks-active-container-color) 0, var(--_with-tick-marks-active-container-color) calc(var(--_with-tick-marks-container-size) / 2), transparent calc(var(--_with-tick-marks-container-size) / 2))}.track:dir(rtl)::after{clip-path:inset(0 calc(var(--_with-tick-marks-container-size) * min(var(--_start-fraction) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * var(--_start-fraction)) 0 calc(var(--_with-tick-marks-container-size) * min((1 - var(--_end-fraction)) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * (1 - var(--_end-fraction))))}.tickmarks:dir(rtl)::after{clip-path:inset(0 calc(var(--_with-tick-marks-container-size) * min(var(--_start-fraction) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * var(--_start-fraction)) 0 calc(var(--_with-tick-marks-container-size) * min((1 - var(--_end-fraction)) * 1000000000, 1) + (100% - var(--_with-tick-marks-container-size) * 2) * (1 - var(--_end-fraction))))}:host([disabled]) .track::after{background:var(--_disabled-active-track-color)}:host([disabled]) .tickmarks::before{background-image:radial-gradient(circle at var(--_with-tick-marks-container-size) center, var(--_with-tick-marks-disabled-container-color) 0, var(--_with-tick-marks-disabled-container-color) calc(var(--_with-tick-marks-container-size) / 2), transparent calc(var(--_with-tick-marks-container-size) / 2))}.handleContainerPadded{position:relative;block-size:100%;inline-size:100%;padding-inline:calc(var(--_state-layer-size)/2)}.handleContainerBlock{position:relative;block-size:100%;inline-size:100%}.handleContainer{position:absolute;inset-block-start:0;inset-block-end:0;inset-inline-start:calc(100%*var(--_start-fraction));inline-size:calc(100%*(var(--_end-fraction) - var(--_start-fraction)))}.handle{position:absolute;block-size:var(--_state-layer-size);inline-size:var(--_state-layer-size);border-radius:var(--_handle-shape);display:flex;place-content:center;place-items:center}.handleNub{position:absolute;height:var(--_handle-height);width:var(--_handle-width);border-radius:var(--_handle-shape);background:var(--_handle-color)}:host([disabled]) .handleNub{background:var(--_disabled-handle-color)}input.end:focus~.handleContainerPadded .handle.end>.handleNub,input.start:focus~.handleContainerPadded .handle.start>.handleNub{background:var(--_focus-handle-color)}.container>.handleContainerPadded .handle.hover>.handleNub{background:var(--_hover-handle-color)}:host(:not([disabled])) input.end:active~.handleContainerPadded .handle.end>.handleNub,:host(:not([disabled])) input.start:active~.handleContainerPadded .handle.start>.handleNub{background:var(--_pressed-handle-color)}.onTop.isOverlapping .label,.onTop.isOverlapping .label::before{outline:var(--_with-overlap-handle-outline-color) solid var(--_with-overlap-handle-outline-width)}.onTop.isOverlapping .handleNub{border:var(--_with-overlap-handle-outline-color) solid var(--_with-overlap-handle-outline-width)}.handle.start{inset-inline-start:calc(0px - var(--_state-layer-size)/2)}.handle.end{inset-inline-end:calc(0px - var(--_state-layer-size)/2)}.label{position:absolute;box-sizing:border-box;display:flex;padding:4px;place-content:center;place-items:center;border-radius:var(--md-sys-shape-corner-full, 9999px);color:var(--_label-text-color);font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);inset-block-end:100%;min-inline-size:var(--_label-container-height);min-block-size:var(--_label-container-height);background:var(--_label-container-color);transition:transform 100ms cubic-bezier(0.2, 0, 0, 1);transform-origin:center bottom;transform:scale(0)}:host(:focus-within) .label,.handleContainer.hover .label,:where(:has(input:active)) .label{transform:scale(1)}.label::before,.label::after{position:absolute;display:block;content:"";background:inherit}.label::before{inline-size:calc(var(--_label-container-height)/2);block-size:calc(var(--_label-container-height)/2);bottom:calc(var(--_label-container-height)/-10);transform:rotate(45deg)}.label::after{inset:0px;border-radius:inherit}.labelContent{z-index:1}input[type=range]{opacity:0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:absolute;box-sizing:border-box;height:100%;width:100%;margin:0;background:rgba(0,0,0,0);cursor:pointer;pointer-events:auto;appearance:none}input[type=range]:focus{outline:none}::-webkit-slider-runnable-track{-webkit-appearance:none}::-moz-range-track{appearance:none}::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;block-size:var(--_handle-height);inline-size:var(--_handle-width);opacity:0;z-index:2}input.end::-webkit-slider-thumb{--_track-and-knob-padding: calc( (var(--_state-layer-size) - var(--_handle-width)) / 2 );--_x-translate: calc( var(--_track-and-knob-padding) - 2 * var(--_end-fraction) * var(--_track-and-knob-padding) );transform:translateX(var(--_x-translate))}input.end:dir(rtl)::-webkit-slider-thumb{transform:translateX(calc(-1 * var(--_x-translate)))}input.start::-webkit-slider-thumb{--_track-and-knob-padding: calc( (var(--_state-layer-size) - var(--_handle-width)) / 2 );--_x-translate: calc( var(--_track-and-knob-padding) - 2 * var(--_start-fraction) * var(--_track-and-knob-padding) );transform:translateX(var(--_x-translate))}input.start:dir(rtl)::-webkit-slider-thumb{transform:translateX(calc(-1 * var(--_x-translate)))}::-moz-range-thumb{appearance:none;block-size:var(--_state-layer-size);inline-size:var(--_state-layer-size);transform:scaleX(0);opacity:0;z-index:2}.ranged input.start{clip-path:inset(0 calc(100% - (var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2))) 0 0)}.ranged input.start:dir(rtl){clip-path:inset(0 0 0 calc(100% - (var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2))))}.ranged input.end{clip-path:inset(0 0 0 calc(var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2)))}.ranged input.end:dir(rtl){clip-path:inset(0 calc(var(--_state-layer-size) / 2 + (100% - var(--_state-layer-size)) * (var(--_start-fraction) + (var(--_end-fraction) - var(--_start-fraction)) / 2)) 0 0)}.onTop{z-index:1}.handle{--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-ripple{border-radius:50%;height:var(--_state-layer-size);width:var(--_state-layer-size)}
`;

// node_modules/@material/web/slider/slider.js
var MdSlider = class MdSlider2 extends Slider {
};
MdSlider.styles = [styles5, styles];
MdSlider = __decorate([
  customElement("md-slider")
], MdSlider);
export {
  MdSlider
};
/*! Bundled license information:

@material/web/slider/internal/forced-colors-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/elevation/internal/elevation.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/elevation/internal/elevation-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/elevation/elevation.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/internal/controller/attachable-controller.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/focus/internal/focus-ring.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/focus/internal/focus-ring-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/focus/md-focus-ring.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/ripple/internal/ripple.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/ripple/internal/ripple-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/ripple/ripple.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lit-html/development/directives/when.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@material/web/internal/events/form-label-activation.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/slider/internal/slider.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/slider/internal/slider-styles.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

@material/web/slider/slider.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=@material_web_slider_slider__js.js.map
