globalThis._importMeta_={url:import.meta.url,env:process.env};import 'file://E:/Node/dlvr/node_modules/.pnpm/node-fetch-native@1.0.1/node_modules/node-fetch-native/dist/polyfill.mjs';
import { Server } from 'http';
import { tmpdir } from 'os';
import { join } from 'path';
import { mkdirSync } from 'fs';
import { parentPort, threadId } from 'worker_threads';
import { provider, isWindows } from 'file://E:/Node/dlvr/node_modules/.pnpm/std-env@3.3.1/node_modules/std-env/dist/index.mjs';
import { eventHandler, setHeaders, sendRedirect, defineEventHandler, handleCacheHeaders, createEvent, getRequestHeader, createApp, createRouter as createRouter$1, lazyEventHandler, toNodeListener, createError } from 'file://E:/Node/dlvr/node_modules/.pnpm/h3@1.0.2/node_modules/h3/dist/index.mjs';
import { createFetch as createFetch$1, Headers } from 'file://E:/Node/dlvr/node_modules/.pnpm/ofetch@1.0.0/node_modules/ofetch/dist/node.mjs';
import destr from 'file://E:/Node/dlvr/node_modules/.pnpm/destr@1.2.2/node_modules/destr/dist/index.mjs';
import { createCall, createFetch } from 'file://E:/Node/dlvr/node_modules/.pnpm/unenv@1.0.1/node_modules/unenv/runtime/fetch/index.mjs';
import { createHooks } from 'file://E:/Node/dlvr/node_modules/.pnpm/hookable@5.4.2/node_modules/hookable/dist/index.mjs';
import { snakeCase } from 'file://E:/Node/dlvr/node_modules/.pnpm/scule@1.0.0/node_modules/scule/dist/index.mjs';
import { hash } from 'file://E:/Node/dlvr/node_modules/.pnpm/ohash@1.0.0/node_modules/ohash/dist/index.mjs';
import { parseURL } from 'file://E:/Node/dlvr/node_modules/.pnpm/ufo@1.0.1/node_modules/ufo/dist/index.mjs';
import defu from 'file://E:/Node/dlvr/node_modules/.pnpm/defu@6.1.1/node_modules/defu/dist/defu.mjs';
import { toRouteMatcher, createRouter } from 'file://E:/Node/dlvr/node_modules/.pnpm/radix3@1.0.0/node_modules/radix3/dist/index.mjs';
import { createStorage } from 'file://E:/Node/dlvr/node_modules/.pnpm/unstorage@1.0.1/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://E:/Node/dlvr/node_modules/.pnpm/unstorage@1.0.1/node_modules/unstorage/dist/drivers/fs.mjs';

const _runtimeConfig = {"app":{"baseURL":"/"},"nitro":{"routeRules":{}}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
const timingMiddleware = eventHandler((event) => {
  const start = globalTiming.start();
  const _end = event.res.end;
  event.res.end = function(chunk, encoding, cb) {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!event.res.headersSent) {
      event.res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(event.res, chunk, encoding, cb);
    return this;
  }.bind(event.res);
});

const serverAssets = [{"baseName":"server","dir":"E:/Node/dlvr/src/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir }));
}

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","base":"E:\\Node\\dlvr","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","base":"E:\\Node\\dlvr\\src","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","base":"E:\\Node\\dlvr\\.nitro","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","base":"E:\\Node\\dlvr\\.nitro\\cache","ignore":["**/node_modules/**","**/.git/**"]}));

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(createRouter({ routes: config.nitro.routeRules }));
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(event, routeRules.redirect.to, routeRules.redirect.statusCode);
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(path);
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      if (validate(entry)) {
        useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    let _resSendBody;
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      },
      end(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      write(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      writeHead(statusCode, headers2) {
        this.statusCode = statusCode;
        if (headers2) {
          for (const header in headers2) {
            this.setHeader(header, headers2[header]);
          }
        }
        return this;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event) || _resSendBody;
    const headers = event.res.getHeaders();
    headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
    headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["cache-control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const isDev = "development" === "development";
const errorHandler = (function(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const showDetails = isDev && statusCode !== 404;
  const errorObject = {
    url: event.req.url || "",
    statusCode,
    statusMessage,
    message,
    stack: showDetails ? stack.map((i) => i.text) : void 0
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nitro]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]"
    ].filter(Boolean).join(" ");
    console.error(tags, error.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  event.res.statusCode = statusCode;
  if (statusMessage) {
    event.res.statusMessage = statusMessage;
  }
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
  } else {
    event.res.setHeader("Content-Type", "text/html");
    event.res.end(renderHTMLError(errorObject));
  }
});
function renderHTMLError(error) {
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Request Error";
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${statusCode} ${statusMessage}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico/css/pico.min.css">
  </head>
  <body>
    <main class="container">
      <dialog open>
        <article>
          <header>
            <h2>${statusCode} ${statusMessage}</h2>
          </header>
          <code>
            ${error.message}<br><br>
            ${"\n" + (error.stack || []).map((i) => `&nbsp;&nbsp;${i}`).join("<br>")}
          </code>
          <footer>
            <a href="/" onclick="event.preventDefault();history.back();">Go Back</a>
          </footer>
        </article>
      </dialog>
    </main>
  </body>
</html>
`;
}

const _lazy_Ojy9R5 = () => Promise.resolve().then(function () { return index$5; });
const _lazy_YsqUxd = () => Promise.resolve().then(function () { return ______get$3; });
const _lazy_m8EWPB = () => Promise.resolve().then(function () { return index$3; });
const _lazy_mMSK9i = () => Promise.resolve().then(function () { return index$1; });
const _lazy_SwUHDE = () => Promise.resolve().then(function () { return ______get$1; });

const handlers = [
  { route: '/npm', handler: _lazy_Ojy9R5, lazy: true, middleware: false, method: undefined },
  { route: '/npm/**', handler: _lazy_YsqUxd, lazy: true, middleware: false, method: "get" },
  { route: '/', handler: _lazy_m8EWPB, lazy: true, middleware: false, method: undefined },
  { route: '/gh', handler: _lazy_mMSK9i, lazy: true, middleware: false, method: undefined },
  { route: '/gh/**', handler: _lazy_SwUHDE, lazy: true, middleware: false, method: "get" }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(true),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(h.route.replace(/:\w+|\*\*/g, "_"));
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();

const server = new Server(toNodeListener(nitroApp.h3App));
function getAddress() {
  if (provider === "stackblitz" || process.env.NITRO_NO_UNIX_SOCKET) {
    return "0";
  }
  const socketName = `worker-${process.pid}-${threadId}.sock`;
  if (isWindows) {
    return join("\\\\.\\pipe\\nitro", socketName);
  } else {
    const socketDir = join(tmpdir(), "nitro");
    mkdirSync(socketDir, { recursive: true });
    return join(socketDir, socketName);
  }
}
const listenAddress = getAddress();
server.listen(listenAddress, () => {
  const _address = server.address();
  parentPort.postMessage({
    event: "listen",
    address: typeof _address === "string" ? { socketPath: _address } : { host: "localhost", port: _address.port }
  });
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection]", err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException]", err));
}

const index$4 = eventHandler((_event) => {
  throw createError({ message: "Invalid request path", status: 400 });
});

const index$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': index$4
});

const ______get$2 = eventHandler(async (event) => {
  const requestPath = event.path.slice("/npm".length);
  const url = `https://unpkg.com${requestPath}`;
  let mime;
  const res = await fetch(url).then((r) => r.redirected ? fetch(r.url) : r).then((r) => {
    mime = r.headers.get("Content-Type") || "text/plain";
    return r.arrayBuffer();
  }).then((r) => new Uint8Array(r));
  event.node.res.setHeader("Content-Type", mime);
  event.node.res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  return res;
});

const ______get$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ______get$2
});

const index$2 = defineEventHandler(async (event) => {
  const data = await useStorage().getItem("assets/server/index.html");
  event.node.res.setHeader("Content-Type", "text/html; charset=utf-8");
  return data;
});

const index$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': index$2
});

const index = eventHandler((_event) => {
  throw createError({ message: "Invalid request path", status: 400 });
});

const index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': index
});

const MATCHER = /^\/gh\/([^/]+)\/([^/@]+)(?:@([^/]+))?(?:\/(.*))?$/;
function parseGithubURL(url) {
  const match = MATCHER.exec(url);
  if (!match) {
    throw new Error(`Invalid github url: ${url}`);
  }
  return {
    owner: match[1],
    repo: match[2],
    branch: match[3] || "master",
    path: match[4] || ""
  };
}

const ______get = eventHandler(async (event) => {
  const requestPath = event.path;
  let parsed;
  try {
    parsed = parseGithubURL(requestPath);
  } catch (e) {
    throw createError({ message: e.message, status: 400 });
  }
  const { owner, repo, branch, path } = parsed;
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
  let mime;
  const res = await fetch(url).then((r) => {
    mime = r.headers.get("Content-Type") || "text/plain";
    return r.arrayBuffer();
  }).then((r) => new Uint8Array(r));
  event.node.res.setHeader("Content-Type", mime);
  event.node.res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  return res;
});

const ______get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ______get
});
//# sourceMappingURL=index.mjs.map
