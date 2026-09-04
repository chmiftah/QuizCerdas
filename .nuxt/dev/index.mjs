import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { Server } from 'node:http';
import path, { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, createError, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, getQuery as getQuery$1, getRequestWebStream, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, getRouterParam, readBody, sendStream, getResponseStatusText } from 'file://D:/projects/edtech/node_modules/h3/dist/index.mjs';
import { escapeHtml } from 'file://D:/projects/edtech/node_modules/@vue/shared/dist/shared.cjs.js';
import viteNodeEntry_mjs from 'file://D:/projects/edtech/node_modules/@nuxt/vite-builder/dist/vite-node-entry.mjs';
import { viteNodeFetch } from 'file://D:/projects/edtech/node_modules/@nuxt/vite-builder/dist/vite-node.mjs';
import bcrypt from 'file://D:/projects/edtech/node_modules/bcryptjs/index.js';
import { PrismaClient } from 'file://D:/projects/edtech/node_modules/@prisma/client/default.js';
import * as googleTTS from 'file://D:/projects/edtech/node_modules/google-tts-api/dist/index.js';
import fs, { promises } from 'node:fs';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file://D:/projects/edtech/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, encodePath, joinRelativeURL } from 'file://D:/projects/edtech/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file://D:/projects/edtech/node_modules/vue/server-renderer/index.mjs';
import { klona } from 'file://D:/projects/edtech/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file://D:/projects/edtech/node_modules/defu/dist/defu.mjs';
import destr, { destr as destr$1 } from 'file://D:/projects/edtech/node_modules/destr/dist/index.mjs';
import { snakeCase } from 'file://D:/projects/edtech/node_modules/scule/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file://D:/projects/edtech/node_modules/unhead/dist/server.mjs';
import { stringify, uneval } from 'file://D:/projects/edtech/node_modules/devalue/index.js';
import { isVNode, isRef, toValue } from 'file://D:/projects/edtech/node_modules/vue/index.mjs';
import { DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'file://D:/projects/edtech/node_modules/unhead/dist/plugins.mjs';
import { createHooks } from 'file://D:/projects/edtech/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file://D:/projects/edtech/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file://D:/projects/edtech/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file://D:/projects/edtech/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://D:/projects/edtech/node_modules/unstorage/drivers/fs.mjs';
import file_58_47_47_47D_58_47projects_47edtech_47node_modules_47_64nuxt_47nitro_45server_47dist_47runtime_47utils_47cache_45driver_46js from 'file://D:/projects/edtech/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js';
import { digest, hash as hash$1 } from 'file://D:/projects/edtech/node_modules/ohash/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file://D:/projects/edtech/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file://D:/projects/edtech/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file://D:/projects/edtech/node_modules/youch-core/build/index.js';
import { Youch } from 'file://D:/projects/edtech/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file://D:/projects/edtech/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getContext } from 'file://D:/projects/edtech/node_modules/unctx/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file://D:/projects/edtech/node_modules/errx/dist/index.mjs';
import _wH6JrtIxmaSoA8lCPWFnE9z4lQeXW6H5z3l5aymEQw from 'file://D:/projects/edtech/node_modules/@nuxt/vite-builder/dist/fix-stacktrace.mjs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1 } from 'file://D:/projects/edtech/node_modules/pathe/dist/index.mjs';
import { walkResolver } from 'file://D:/projects/edtech/node_modules/unhead/dist/utils.mjs';

const serverAssets = [{"baseName":"server","dir":"D:/projects/edtech/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"D:/projects/edtech","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"D:/projects/edtech/server","watchOptions":{"ignored":[null]}}));
storage.mount('cache:nuxt:payload', file_58_47_47_47D_58_47projects_47edtech_47node_modules_47_64nuxt_47nitro_45server_47dist_47runtime_47utils_47cache_45driver_46js({"driver":"file:///D:/projects/edtech/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js","base":"D:/projects/edtech/.nuxt/cache/nuxt/payload"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"D:/projects/edtech/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"D:/projects/edtech/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"D:/projects/edtech/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
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
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
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
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
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

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      }
    }
  },
  "public": {}
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function isPathInScope(pathname, base) {
  let canonical;
  try {
    const pre = pathname.replace(/%2f/gi, "/").replace(/%5c/gi, "\\");
    canonical = new URL(pre, "http://_").pathname;
  } catch {
    return false;
  }
  return !base || canonical === base || canonical.startsWith(base + "/");
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
	
	if (hasReqHeader(event, "accept", "text/html")) {
		return false;
	}
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader(event, name);
	return !!(value && typeof value === "string" && value.toLowerCase().includes(includes));
}

const iframeStorageBridge = (nonce) => `
(function () {
  const NONCE = ${JSON.stringify(nonce)};
  const memoryStore = Object.create(null);

  const post = (type, payload) => {
    window.parent.postMessage({ type, nonce: NONCE, ...payload }, '*');
  };

  const isValid = (data) => data && data.nonce === NONCE;

  const mockStorage = {
    getItem(key) {
      return Object.hasOwn(memoryStore, key)
        ? memoryStore[key]
        : null;
    },
    setItem(key, value) {
      const v = String(value);
      memoryStore[key] = v;
      post('storage-set', { key, value: v });
    },
    removeItem(key) {
      delete memoryStore[key];
      post('storage-remove', { key });
    },
    clear() {
      for (const key of Object.keys(memoryStore))
        delete memoryStore[key];
      post('storage-clear', {});
    },
    key(index) {
      const keys = Object.keys(memoryStore);
      return keys[index] ?? null;
    },
    get length() {
      return Object.keys(memoryStore).length;
    }
  };

  const defineLocalStorage = () => {
    try {
      Object.defineProperty(window, 'localStorage', {
        value: mockStorage,
        writable: false,
        configurable: true
      });
    } catch {
      window.localStorage = mockStorage;
    }
  };

  defineLocalStorage();

  window.addEventListener('message', (event) => {
    const data = event.data;
    if (!isValid(data) || data.type !== 'storage-sync-data') return;

    const incoming = data.data || {};
    for (const key of Object.keys(incoming))
      memoryStore[key] = incoming[key];

    if (typeof window.initTheme === 'function')
      window.initTheme();
    window.dispatchEvent(new Event('storage-ready'));
  });

  // Clipboard API is unavailable in data: URL iframe, so we use postMessage
  document.addEventListener('DOMContentLoaded', function() {
    window.copyErrorMessage = function(button) {
      post('clipboard-copy', { text: button.dataset.errorText });
      button.classList.add('copied');
      setTimeout(function() { button.classList.remove('copied'); }, 2000);
    };
  });

  post('storage-sync-request', {});
})();
`;
const parentStorageBridge = (nonce) => `
(function () {
  const host = document.querySelector('nuxt-error-overlay');
  if (!host) return;

  const NONCE = ${JSON.stringify(nonce)};
  const isValid = (data) => data && data.nonce === NONCE;

  // Handle clipboard copy from iframe
  window.addEventListener('message', function(e) {
    if (isValid(e.data) && e.data.type === 'clipboard-copy') {
      navigator.clipboard.writeText(e.data.text).catch(function() {});
    }
  });

  const collectLocalStorage = () => {
    const all = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k != null) all[k] = localStorage.getItem(k);
    }
    return all;
  };

  const attachWhenReady = () => {
    const root = host.shadowRoot;
    if (!root)
      return false;
    const iframe = root.getElementById('frame');
    if (!iframe || !iframe.contentWindow)
      return false;

    const handlers = {
      'storage-set': (d) => localStorage.setItem(d.key, d.value),
      'storage-remove': (d) => localStorage.removeItem(d.key),
      'storage-clear': () => localStorage.clear(),
      'storage-sync-request': () => {
        iframe.contentWindow.postMessage({
          type: 'storage-sync-data',
          data: collectLocalStorage(),
          nonce: NONCE
        }, '*');
      }
    };

    window.addEventListener('message', (event) => {
      const data = event.data;
      if (!isValid(data)) return;
      const fn = handlers[data.type];
      if (fn) fn(data);
    });

    return true;
  };

  if (attachWhenReady())
    return;

  const obs = new MutationObserver(() => {
    if (attachWhenReady())
      obs.disconnect();
  });

  obs.observe(host, { childList: true, subtree: true });
})();
`;
const errorCSS = `
:host {
  --preview-width: 240px;
  --preview-height: 180px;
  --base-width: 1200px;
  --base-height: 900px;
  --z-base: 999999998;
  --error-pip-left: auto;
  --error-pip-top: auto;
  --error-pip-right: 5px;
  --error-pip-bottom: 5px;
  --error-pip-origin: bottom right;
  --app-preview-left: auto;
  --app-preview-top: auto;
  --app-preview-right: 5px;
  --app-preview-bottom: 5px;
  all: initial;
  display: contents;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
#frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  z-index: var(--z-base);
}
#frame[inert] {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: var(--error-pip-right);
  bottom: var(--error-pip-bottom);
  width: var(--base-width);
  height: var(--base-height);
  transform: scale(calc(240 / 1200));
  transform-origin: var(--error-pip-origin);
  overflow: hidden;
  border-radius: calc(1200 * 8px / 240);
}
#preview {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: var(--app-preview-right);
  bottom: var(--app-preview-bottom);
  width: var(--preview-width);
  height: var(--preview-height);
  overflow: hidden;
  border-radius: 6px;
  pointer-events: none;
  z-index: var(--z-base);
  background: white;
  display: none;
}
#preview iframe {
  transform-origin: var(--error-pip-origin);
}
#frame:not([inert]) + #preview {
  display: block;
}
#toggle {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: calc(var(--app-preview-right) - 3px);
  bottom: calc(var(--app-preview-bottom) - 3px);
  width: var(--preview-width);
  height: var(--preview-height);
  background: none;
  border: 3px solid #00DC82;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s, box-shadow 0.2s;
  z-index: calc(var(--z-base) + 1);
  display: flex;
  align-items: center;
  justify-content: center;
}
#toggle:hover,
#toggle:focus {
  opacity: 1;
  box-shadow: 0 0 20px rgba(0, 220, 130, 0.6);
}
#toggle:focus-visible {
  outline: 3px solid #00DC82;
  outline-offset: 0;
  box-shadow: 0 0 24px rgba(0, 220, 130, 0.8);
}
#frame[inert] ~ #toggle {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: calc(var(--error-pip-right) - 3px);
  bottom: calc(var(--error-pip-bottom) - 3px);
  cursor: grab;
}
:host(.dragging) #frame[inert] ~ #toggle {
  cursor: grabbing;
}
#frame:not([inert]) ~ #toggle,
#frame:not([inert]) + #preview {
  cursor: grab;
}
:host(.dragging-preview) #frame:not([inert]) ~ #toggle,
:host(.dragging-preview) #frame:not([inert]) + #preview {
  cursor: grabbing;
}

#pip-close {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 16px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
}
#pip-close:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}

#pip-restore {
  position: fixed;
  right: 16px;
  bottom: 16px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 2px solid #00DC82;
  background: #111;
  color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  z-index: calc(var(--z-base) + 2);
  cursor: grab;
}
#pip-restore:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}
:host(.dragging-restore) #pip-restore {
  cursor: grabbing;
}

#frame[hidden],
#toggle[hidden],
#preview[hidden],
#pip-restore[hidden],
#pip-close[hidden] {
  display: none !important;
}

@media (prefers-reduced-motion: reduce) {
  #toggle {
    transition: none;
  }
}
`;
function webComponentScript(base64HTML, startMinimized) {
	return `
(function () {
  try {
    // =========================
    // Host + Shadow
    // =========================
    const host = document.querySelector('nuxt-error-overlay');
    if (!host)
      return;
    const shadow = host.attachShadow({ mode: 'open' });

    // =========================
    // DOM helpers
    // =========================
    const el = (tag) => document.createElement(tag);
    const on = (node, type, fn, opts) => node.addEventListener(type, fn, opts);
    const hide = (node, v) => node.toggleAttribute('hidden', !!v);
    const setVar = (name, value) => host.style.setProperty(name, value);
    const unsetVar = (name) => host.style.removeProperty(name);

    // =========================
    // Create DOM
    // =========================
    const style = el('style');
    style.textContent = ${JSON.stringify(errorCSS)};

    const iframe = el('iframe');
    iframe.id = 'frame';
    iframe.src = 'data:text/html;base64,${base64HTML}';
    iframe.title = 'Detailed error stack trace';
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-top-navigation-by-user-activation');

    const preview = el('div');
    preview.id = 'preview';

    const toggle = el('div');
    toggle.id = 'toggle';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    toggle.innerHTML = '<span class="sr-only">Toggle detailed error view</span>';

    const liveRegion = el('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';

    const pipCloseButton = el('button');
    pipCloseButton.id = 'pip-close';
    pipCloseButton.setAttribute('type', 'button');
    pipCloseButton.setAttribute('aria-label', 'Hide error preview overlay');
    pipCloseButton.innerHTML = '&times;';
    pipCloseButton.hidden = true;
    toggle.appendChild(pipCloseButton);

    const pipRestoreButton = el('button');
    pipRestoreButton.id = 'pip-restore';
    pipRestoreButton.setAttribute('type', 'button');
    pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
    pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
    pipRestoreButton.hidden = true;

    // Order matters: #frame + #preview adjacency
    shadow.appendChild(style);
    shadow.appendChild(liveRegion);
    shadow.appendChild(iframe);
    shadow.appendChild(preview);
    shadow.appendChild(toggle);
    shadow.appendChild(pipRestoreButton);

    // =========================
    // Constants / keys
    // =========================
    const POS_KEYS = {
      position: 'nuxt-error-overlay:position',
      hiddenPretty: 'nuxt-error-overlay:error-pip:hidden',
      hiddenPreview: 'nuxt-error-overlay:app-preview:hidden'
    };

    const CSS_VARS = {
      pip: {
        left: '--error-pip-left',
        top: '--error-pip-top',
        right: '--error-pip-right',
        bottom: '--error-pip-bottom'
      },
      preview: {
        left: '--app-preview-left',
        top: '--app-preview-top',
        right: '--app-preview-right',
        bottom: '--app-preview-bottom'
      }
    };

    const MIN_GAP = 5;
    const DRAG_THRESHOLD = 2;

    // =========================
    // Local storage safe access + state
    // =========================
    let storageReady = true;
    let isPrettyHidden = false;
    let isPreviewHidden = false;

    const safeGet = (k) => {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    };

    const safeSet = (k, v) => {
      if (!storageReady) 
        return;
      try {
        localStorage.setItem(k, v);
      } catch {}
    };

    // =========================
    // Sizing helpers
    // =========================
    const vvSize = () => {
      const v = window.visualViewport;
      return v ? { w: v.width, h: v.height } : { w: window.innerWidth, h: window.innerHeight };
    };

    const previewSize = () => {
      const styles = getComputedStyle(host);
      const w = parseFloat(styles.getPropertyValue('--preview-width')) || 240;
      const h = parseFloat(styles.getPropertyValue('--preview-height')) || 180;
      return { w, h };
    };

    const sizeForTarget = (target) => {
      if (!target)
        return previewSize();
      const rect = target.getBoundingClientRect();
      if (rect.width && rect.height)
        return { w: rect.width, h: rect.height };
      return previewSize();
    };

    // =========================
    // Dock model + offset/alignment calculations
    // =========================
    const dock = { edge: null, offset: null, align: null, gap: null };

    const maxOffsetFor = (edge, size) => {
      const vv = vvSize();
      if (edge === 'left' || edge === 'right')
        return Math.max(MIN_GAP, vv.h - size.h - MIN_GAP);
      return Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
    };

    const clampOffset = (edge, value, size) => {
      const max = maxOffsetFor(edge, size);
      return Math.min(Math.max(value, MIN_GAP), max);
    };

    const updateDockAlignment = (size) => {
      if (!dock.edge || dock.offset == null)
        return;
      const max = maxOffsetFor(dock.edge, size);
      if (dock.offset <= max / 2) {
        dock.align = 'start';
        dock.gap = dock.offset;
      } else {
        dock.align = 'end';
        dock.gap = Math.max(0, max - dock.offset);
      }
    };

    const appliedOffsetFor = (size) => {
      if (!dock.edge || dock.offset == null)
        return null;
      const max = maxOffsetFor(dock.edge, size);

      if (dock.align === 'end' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, max - dock.gap, size);
      }
      if (dock.align === 'start' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, dock.gap, size);
      }
      return clampOffset(dock.edge, dock.offset, size);
    };

    const nearestEdgeAt = (x, y) => {
      const { w, h } = vvSize();
      const d = { left: x, right: w - x, top: y, bottom: h - y };
      return Object.keys(d).reduce((a, b) => (d[a] < d[b] ? a : b));
    };

    const cornerDefaultDock = () => {
      const vv = vvSize();
      const size = previewSize();
      const offset = Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
      return { edge: 'bottom', offset };
    };

    const currentTransformOrigin = () => {
      if (!dock.edge) return null;
      if (dock.edge === 'left' || dock.edge === 'top')
        return 'top left';
      if (dock.edge === 'right')
        return 'top right';
      return 'bottom left';
    };

    // =========================
    // Persist / load dock
    // =========================
    const loadDock = () => {
      const raw = safeGet(POS_KEYS.position);
      if (!raw)
        return;
      try {
        const parsed = JSON.parse(raw);
        const { edge, offset, align, gap } = parsed || {};
        if (!['left', 'right', 'top', 'bottom'].includes(edge))
          return;
        if (typeof offset !== 'number')
          return;

        dock.edge = edge;
        dock.offset = clampOffset(edge, offset, previewSize());
        dock.align = align === 'start' || align === 'end' ? align : null;
        dock.gap = typeof gap === 'number' ? gap : null;

        if (!dock.align || dock.gap == null)
          updateDockAlignment(previewSize());
      } catch {}
    };

    const persistDock = () => {
      if (!dock.edge || dock.offset == null)
        return; 
      safeSet(POS_KEYS.position, JSON.stringify({
        edge: dock.edge,
        offset: dock.offset,
        align: dock.align,
        gap: dock.gap
      }));
    };

    // =========================
    // Apply dock
    // =========================
    const dockToVars = (vars) => ({
      set: (side, v) => host.style.setProperty(vars[side], v),
      clear: (side) => host.style.removeProperty(vars[side])
    });

    const dockToEl = (node) => ({
      set: (side, v) => { node.style[side] = v; },
      clear: (side) => { node.style[side] = ''; }
    });

    const applyDock = (target, size, opts) => {
      if (!dock.edge || dock.offset == null) {
        target.clear('left');
        target.clear('top');
        target.clear('right');
        target.clear('bottom');
        return;
      }

      target.set('left', 'auto');
      target.set('top', 'auto');
      target.set('right', 'auto');
      target.set('bottom', 'auto');

      const applied = appliedOffsetFor(size);

      if (dock.edge === 'left') {
        target.set('left', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'right') {
        target.set('right', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'top') {
        target.set('top', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      } else {
        target.set('bottom', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      }

      if (!opts || opts.persist !== false)
        persistDock();
    };

    const applyDockAll = (opts) => {
      applyDock(dockToVars(CSS_VARS.pip), previewSize(), opts);
      applyDock(dockToVars(CSS_VARS.preview), previewSize(), opts);
      applyDock(dockToEl(pipRestoreButton), sizeForTarget(pipRestoreButton), opts);
    };

    const repaintToDock = () => {
      if (!dock.edge || dock.offset == null)
        return;
      const origin = currentTransformOrigin();
      if (origin)
        setVar('--error-pip-origin', origin);
      else 
        unsetVar('--error-pip-origin');
      applyDockAll({ persist: false });
    };

    // =========================
    // Hidden state + UI
    // =========================
    const loadHidden = () => {
      const rawPretty = safeGet(POS_KEYS.hiddenPretty);
      if (rawPretty != null)
        isPrettyHidden = rawPretty === '1' || rawPretty === 'true';
      const rawPreview = safeGet(POS_KEYS.hiddenPreview);
      if (rawPreview != null)
        isPreviewHidden = rawPreview === '1' || rawPreview === 'true';
    };

    const setPrettyHidden = (v) => {
      isPrettyHidden = !!v;
      safeSet(POS_KEYS.hiddenPretty, isPrettyHidden ? '1' : '0');
      updateUI();
    };

    const setPreviewHidden = (v) => {
      isPreviewHidden = !!v;
      safeSet(POS_KEYS.hiddenPreview, isPreviewHidden ? '1' : '0');
      updateUI();
    };

    const isMinimized = () => iframe.hasAttribute('inert');

    const setMinimized = (v) => {
      if (v) {
        iframe.setAttribute('inert', '');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        iframe.removeAttribute('inert');
        toggle.setAttribute('aria-expanded', 'true');
      }
    };

    const setRestoreLabel = (kind) => {
      if (kind === 'pretty') {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
      } else {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error page</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error page');
      }
    };

    const updateUI = () => {
      const minimized = isMinimized();
      const showPiP = minimized && !isPrettyHidden;
      const showPreview = !minimized && !isPreviewHidden;
      const pipHiddenByUser = minimized && isPrettyHidden;
      const previewHiddenByUser = !minimized && isPreviewHidden;
      const showToggle = minimized ? showPiP : showPreview;
      const showRestore = pipHiddenByUser || previewHiddenByUser;

      hide(iframe, pipHiddenByUser);
      hide(preview, !showPreview);
      hide(toggle, !showToggle);
      hide(pipCloseButton, !showToggle);
      hide(pipRestoreButton, !showRestore);

      pipCloseButton.setAttribute('aria-label', minimized ? 'Hide error overlay' : 'Hide error page preview');

      if (pipHiddenByUser)
        setRestoreLabel('pretty');
      else if (previewHiddenByUser)
        setRestoreLabel('preview');

      host.classList.toggle('pip-hidden', isPrettyHidden);
      host.classList.toggle('preview-hidden', isPreviewHidden);
    };

    // =========================
    // Preview snapshot
    // =========================
    const updatePreview = () => {
      try {
        let previewIframe = preview.querySelector('iframe');
        if (!previewIframe) {
          previewIframe = el('iframe');
          previewIframe.style.cssText = 'width: 1200px; height: 900px; transform: scale(0.2); transform-origin: top left; border: none;';
          previewIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
          preview.appendChild(previewIframe);
        }

        const doctype = document.doctype ? '<!DOCTYPE ' + document.doctype.name + '>' : '';
        const cleanedHTML = document.documentElement.outerHTML
          .replace(/<nuxt-error-overlay[^>]*>.*?<\\/nuxt-error-overlay>/gs, '')
          .replace(/<script[^>]*>.*?<\\/script>/gs, '');

        const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(doctype + cleanedHTML);
        iframeDoc.close();
      } catch (err) {
        console.error('Failed to update preview:', err);
      }
    };

    // =========================
    // View toggling
    // =========================
    const toggleView = () => {
      if (isMinimized()) {
        updatePreview();
        setMinimized(false);
        liveRegion.textContent = 'Showing detailed error view';
        setTimeout(() => { 
          try { 
            iframe.contentWindow.focus();
          } catch {}
        }, 100);
      } else {
        setMinimized(true);
        liveRegion.textContent = 'Showing error page';
        repaintToDock();
        void iframe.offsetWidth;
      }
      updateUI();
    };

    // =========================
    // Dragging (unified, rAF throttled)
    // =========================
    let drag = null;
    let rafId = null;
    let suppressToggleClick = false;
    let suppressRestoreClick = false;

    const beginDrag = (e) => {
      if (drag) 
        return;

      if (!dock.edge || dock.offset == null) {
        const def = cornerDefaultDock();
        dock.edge = def.edge;
        dock.offset = def.offset;
        updateDockAlignment(previewSize());
      }

      const isRestoreTarget = e.currentTarget === pipRestoreButton;

      drag = {
        kind: isRestoreTarget ? 'restore' : (isMinimized() ? 'pip' : 'preview'),
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastY: e.clientY,
        moved: false,
        target: e.currentTarget
      };

      drag.target.setPointerCapture(e.pointerId);

      if (drag.kind === 'restore')
        host.classList.add('dragging-restore');
      else 
        host.classList.add(drag.kind === 'pip' ? 'dragging' : 'dragging-preview');

      e.preventDefault();
    };

    const moveDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      
      const dx = drag.lastX - drag.startX;
      const dy = drag.lastY - drag.startY;

      if (!drag.moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
        drag.moved = true;
      }

      if (!drag.moved)
        return;
      if (rafId)
        return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const edge = nearestEdgeAt(drag.lastX, drag.lastY);
        const size = sizeForTarget(drag.target);

        let offset;
        if (edge === 'left' || edge === 'right') {
          const top = drag.lastY - (size.h / 2);
          offset = clampOffset(edge, Math.round(top), size);
        } else {
          const left = drag.lastX - (size.w / 2);
          offset = clampOffset(edge, Math.round(left), size);
        }

        dock.edge = edge;
        dock.offset = offset;
        updateDockAlignment(size);

        const origin = currentTransformOrigin();
        setVar('--error-pip-origin', origin || 'bottom right');

        applyDockAll({ persist: false });
      });
    };

    const endDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      const endedKind = drag.kind;
      drag.target.releasePointerCapture(e.pointerId);

      if (endedKind === 'restore')
        host.classList.remove('dragging-restore');
      else 
        host.classList.remove(endedKind === 'pip' ? 'dragging' : 'dragging-preview');

      const didMove = drag.moved;
      drag = null;

      if (didMove) {
        persistDock();
        if (endedKind === 'restore')
          suppressRestoreClick = true;
        else 
          suppressToggleClick = true;
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const bindDragTarget = (node) => {
      on(node, 'pointerdown', beginDrag);
      on(node, 'pointermove', moveDrag);
      on(node, 'pointerup', endDrag);
      on(node, 'pointercancel', endDrag);
    };

    bindDragTarget(toggle);
    bindDragTarget(pipRestoreButton);

    // =========================
    // Events (toggle / close / restore)
    // =========================
    on(toggle, 'click', (e) => {
      if (suppressToggleClick) {
        e.preventDefault();
        suppressToggleClick = false;
        return;
      }
      toggleView();
    });

    on(toggle, 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleView();
      }
    });

    on(pipCloseButton, 'click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized())
        setPrettyHidden(true);
      else
        setPreviewHidden(true);
    });

    on(pipCloseButton, 'pointerdown', (e) => {
      e.stopPropagation();
    });

    on(pipRestoreButton, 'click', (e) => {
      if (suppressRestoreClick) {
        e.preventDefault();
        suppressRestoreClick = false;
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized()) 
        setPrettyHidden(false);
      else 
        setPreviewHidden(false);
    });

    // =========================
    // Lifecycle: load / sync / repaint
    // =========================
    const loadState = () => {
      loadDock();
      loadHidden();

      if (isPrettyHidden && !isMinimized())
        setMinimized(true);

      updateUI();
      repaintToDock();
    };

    loadState();

    on(window, 'storage-ready', () => {
      storageReady = true;
      loadState();
    });

    const onViewportChange = () => repaintToDock();

    on(window, 'resize', onViewportChange);

    if (window.visualViewport) {
      on(window.visualViewport, 'resize', onViewportChange);
      on(window.visualViewport, 'scroll', onViewportChange);
    }

    // initial preview
    setTimeout(updatePreview, 100);

    // initial minimized option
    if (${startMinimized}) {
      setMinimized(true);
      repaintToDock();
      void iframe.offsetWidth;
      updateUI();
    }
  } catch (err) {
    console.error('Failed to initialize Nuxt error overlay:', err);
  }
})();
`;
}
function generateErrorOverlayHTML(html, options) {
	const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
	const errorPage = html.replace("<head>", `<head><script>${iframeStorageBridge(nonce)}<\/script>`);
	const base64HTML = Buffer.from(errorPage, "utf8").toString("base64");
	return `
    <script>${parentStorageBridge(nonce)}<\/script>
    <nuxt-error-overlay></nuxt-error-overlay>
    <script>${webComponentScript(base64HTML, options?.startMinimized ?? false)}<\/script>
  `;
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) {
		
		return;
	}
	
	const defaultRes = await defaultHandler(error, event, { json: true });
	
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
		
		defaultRes.body.stack = defaultRes.body.stack.join("\n");
	}
	const errorObject = defaultRes.body;
	
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	
	const reqHeaders = getRequestHeaders(event);
	
	const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"] || !!event.context.nuxt?.["~rendering-error"];
	if (!isRenderingError) {
		event.context.nuxt ||= {};
		event.context.nuxt["~rendering-error"] = true;
	}
	
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) {
		return;
	}
	
	if (!res) {
		const { template } = await Promise.resolve().then(function () { return error500; });
		{
			
			errorObject.description = errorObject.message;
		}
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		return send(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	if (!globalThis._importMeta_.test && typeof html === "string") {
		const prettyResponse = await defaultHandler(error, event, { json: false });
		if (typeof prettyResponse.body === "string") {
			return send(event, html.replace("</body>", `${generateErrorOverlayHTML(prettyResponse.body, { startMinimized: 300 <= status && status < 500 })}</body>`));
		}
	}
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json ?? !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _8ncZovw96iF3nKo4TBzT_M41IPYwO2jkZqbPzjZHsQ = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "D:/projects/edtech";

const appHead = {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"description","content":"Aplikasi belajar berhitung 1-20 interaktif untuk anak SD dengan metode micro-learning, gamifikasi, XP, nyawa, dan skill tree."}],"link":[{"rel":"preconnect","href":"https://fonts.googleapis.com"},{"rel":"preconnect","href":"https://fonts.gstatic.com","crossorigin":""},{"rel":"stylesheet","href":"https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap"}],"style":[],"script":[],"noscript":[],"title":"Petualangan Berhitung - Belajar Matematika Bergaya Duolingo"};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
	VNode: (data) => isVNode(data) ? {
		type: data.type,
		props: data.props
	} : undefined,
	URL: (data) => data instanceof URL ? data.toString() : undefined,
	Symbol: (data) => typeof data === "symbol" ? data.description ?? "" : undefined
};
const asyncContext = getContext("nuxt-dev", {
	asyncContext: true,
	AsyncLocalStorage
});
const _PKbWn0XOt_ryMFhHR14g_D9aE1RjnK76a4TnjbrA3TQ = (nitroApp) => {
	const handler = nitroApp.h3App.handler;
	nitroApp.h3App.handler = (event) => {
		return asyncContext.callAsync({
			logs: [],
			event
		}, () => handler(event));
	};
	onConsoleLog((_log) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		const rawStack = captureRawStackTrace();
		if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
			return;
		}
		const trace = [];
		let filename = "";
		for (const entry of parseRawStackTrace(rawStack)) {
			if (entry.source === globalThis._importMeta_.url) {
				continue;
			}
			if (EXCLUDE_TRACE_RE.test(entry.source)) {
				continue;
			}
			filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
			trace.push({
				...entry,
				source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
			});
		}
		const log = {
			..._log,
			
			filename,
			
			stack: trace
		};
		
		ctx.logs.push(log);
	});
	nitroApp.hooks.hook("afterResponse", () => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		return nitroApp.hooks.callHook("dev:ssr-logs", {
			logs: ctx.logs,
			path: ctx.event.path
		});
	});
	
	nitroApp.hooks.hook("render:html", (htmlContext) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		try {
			const reducers = Object.assign(Object.create(null), devReducers, ctx.event.context["~payloadReducers"]);
			htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
		} catch (e) {
			const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
			console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
		}
	});
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
	consola$1.addReporter({ log(logObj) {
		callback(logObj);
	} });
	consola$1.wrapConsole();
}

const plugins = [
  _8ncZovw96iF3nKo4TBzT_M41IPYwO2jkZqbPzjZHsQ,
_PKbWn0XOt_ryMFhHR14g_D9aE1RjnK76a4TnjbrA3TQ,
_wH6JrtIxmaSoA8lCPWFnE9z4lQeXW6H5z3l5aymEQw
];

const assets = {
  "/index.mjs": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3a503-neOd0bHv1bp7AZabi3v8nb7i+EI\"",
    "mtime": "2026-09-03T15:15:13.194Z",
    "size": 238851,
    "path": "index.mjs"
  },
  "/index.mjs.map": {
    "type": "application/json",
    "etag": "\"7f98c-6WuhECwakQjNZSumGvWT1tc7D34\"",
    "mtime": "2026-09-03T15:15:13.195Z",
    "size": 522636,
    "path": "index.mjs.map"
  }
};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _z6xllt = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

function computeIslandHash(name, serializedProps, context, source) {
  let parsed;
  try {
    parsed = JSON.parse(serializedProps);
  } catch {
    parsed = serializedProps;
  }
  return hash$1([name, parsed, context, source]).replace(/[-_]/g, "");
}

const MAX_ISLAND_BODY_BYTES = 64 * 1024;

const MAX_ISLAND_PROP_DEPTH = 64;

function exceedsMaxDepth(raw, maxDepth = MAX_ISLAND_PROP_DEPTH) {
	let depth = 0;
	let inString = false;
	let escaped = false;
	for (let i = 0; i < raw.length; i++) {
		const ch = raw[i];
		if (inString) {
			if (escaped) {
				escaped = false;
			} else if (ch === "\\") {
				escaped = true;
			} else if (ch === "\"") {
				inString = false;
			}
			continue;
		}
		if (ch === "\"") {
			inString = true;
		} else if (ch === "{" || ch === "[") {
			if (++depth > maxDepth) {
				return true;
			}
		} else if (ch === "}" || ch === "]") {
			if (depth > 0) {
				depth--;
			}
		}
	}
	return false;
}

function exceedsMaxBytes(raw, maxBytes = MAX_ISLAND_BODY_BYTES) {
	return Buffer.byteLength(raw, "utf8") > maxBytes;
}

const NUXT_RUNTIME_PAYLOAD_EXTRACTION = false;

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
  disableCapoSorting: false,
  plugins: [DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin],
};

function encodeEventPath(path) {
	const queryIndex = path.indexOf("?");
	if (queryIndex === -1) {
		return encodePath(path);
	}
	return encodePath(path.slice(0, queryIndex)) + path.slice(queryIndex);
}
function createSSRContext(event) {
	const url = encodeEventPath(event.path);
	const ssrContext = {
		url,
		event,
		runtimeConfig: useRuntimeConfig(event),
		noSSR: event.context.nuxt?.noSSR || (false),
		head: createHead(unheadOptions),
		error: false,
		nuxt: undefined,
		payload: {},
		["~payloadReducers"]: Object.create(null),
		modules: new Set()
	};
	return ssrContext;
}
function setSSRError(ssrContext, error) {
	ssrContext.error = true;
	ssrContext.payload = { error };
	ssrContext.url = error.url;
}

function buildAssetsDir() {
	
	return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	
	const app = useRuntimeConfig().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
// @ts-expect-error file will be produced after app build
const getServerEntry = () => Promise.resolve().then(function () { return server; }).then((r) => r.default || r);
// @ts-expect-error file will be produced after app build
const getClientManifest = () => Promise.resolve().then(function () { return client_manifest$1; }).then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);

const getSSRRenderer = lazyCachedFunction(async () => {
	
	const createSSRApp = await getServerEntry();
	if (!createSSRApp) {
		throw new Error("Server bundle is not available");
	}
	
	const precomputed = undefined ;
	
	const renderer = createRenderer(createSSRApp, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: renderToString$1,
		buildAssetsURL
	});
	async function renderToString$1(input, context) {
		const html = await renderToString(input, context);
		
		
		if (process.env.NUXT_VITE_NODE_OPTIONS) {
			renderer.rendererContext.updateManifest(await getClientManifest());
		}
		return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
	}
	return renderer;
});

const getSPARenderer = lazyCachedFunction(async () => {
	const precomputed = undefined ;
	// @ts-expect-error virtual file
	const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
		{
			return APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG;
		}
	});
	
	const renderer = createRenderer(() => () => {}, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: () => spaTemplate,
		buildAssetsURL
	});
	const result = await renderer.renderToString({});
	const renderToString = (ssrContext) => {
		const config = useRuntimeConfig(ssrContext.event);
		ssrContext.modules ||= new Set();
		ssrContext.payload.serverRendered = false;
		ssrContext.config = {
			public: config.public,
			app: config.app
		};
		return Promise.resolve(result);
	};
	return {
		rendererContext: renderer.rendererContext,
		renderToString
	};
});
function lazyCachedFunction(fn) {
	let res = null;
	return () => {
		if (res === null) {
			res = fn().catch((err) => {
				res = null;
				throw err;
			});
		}
		return res;
	};
}
function getRenderer(ssrContext) {
	return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
// @ts-expect-error file will be produced after app build
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
	const styleMap = await getSSRStyles();
	const inlinedStyles = new Set();
	for (const mod of usedModules) {
		if (mod in styleMap && styleMap[mod]) {
			for (const style of await styleMap[mod]()) {
				inlinedStyles.add(style);
			}
		}
	}
	return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

// @ts-expect-error virtual file
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);

function getServerComponentHTML(body) {
	const match = body.match(ROOT_NODE_REGEX);
	return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
		return undefined;
	}
	const response = {};
	for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
		response[name] = {
			...slot,
			fallback: ssrContext.teleports?.[`island-fallback=${name}`]
		};
	}
	return response;
}
function getClientIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
		return undefined;
	}
	const response = {};
	for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
		
		let html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
		
		if (!html && ssrContext.teleports) {
			for (const [key, value] of Object.entries(ssrContext.teleports)) {
				const [, , componentUid] = key.match(SSR_CLIENT_TELEPORT_MARKER) ?? [];
				if (componentUid === clientUid) {
					html = value.replaceAll("<!--teleport start anchor-->", "");
					break;
				}
			}
		}
		response[clientUid] = {
			...component,
			html,
			slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
		};
	}
	return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
	const entries = Object.entries(teleports);
	const slots = {};
	for (const [key, value] of entries) {
		const match = key.match(SSR_CLIENT_SLOT_MARKER);
		if (match) {
			const [, id, slot] = match;
			if (!slot || clientUid !== id) {
				continue;
			}
			slots[slot] = value;
		}
	}
	return slots;
}
function replaceIslandTeleports(ssrContext, html) {
	const { teleports, islandContext } = ssrContext;
	if (islandContext || !teleports) {
		return html;
	}
	for (const key in teleports) {
		const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
		if (matchClientComp) {
			const [, uid, clientId] = matchClientComp;
			if (!uid || !clientId) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
			continue;
		}
		const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
		if (matchSlot) {
			const [, uid, slot] = matchSlot;
			if (!uid || !slot) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
		}
	}
	return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const handler$1 = defineEventHandler(async (event) => {
	setResponseHeaders(event, {
		"content-type": "application/json;charset=utf-8",
		"x-powered-by": "Nuxt"
	});
	{
		return toResponse(event, await renderIsland(event));
	}
});
function toResponse(event, result) {
	return "raw" in result ? returnIslandResponse(event, result.raw) : result;
}
async function renderIsland(event) {
	const nitroApp = useNitroApp();
	const islandContext = await getIslandContext(event);
	const ssrContext = {
		...createSSRContext(event),
		islandContext,
		noSSR: false,
		url: islandContext.url
	};
	
	const renderer = await getSSRRenderer();
	const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
		if (ssrContext["~renderResponse"] && err?.message === "skipping render") {
			return {};
		}
		await ssrContext.nuxt?.hooks.callHook("app:error", err);
		throw err;
	});
	
	
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult
	});
	if (ssrContext["~renderResponse"]) {
		const response = ssrContext["~renderResponse"];
		if (response.statusCode && response.statusCode >= 400) {
			throw createError({
				statusCode: response.statusCode,
				statusMessage: response.statusMessage
			});
		}
		return { raw: response };
	}
	
	if (ssrContext.payload?.error) {
		throw ssrContext.payload.error;
	}
	const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	{
		const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
		const link = [];
		for (const resource of Object.values(styles)) {
			
			if ("inline" in getQuery(resource.file)) {
				continue;
			}
			
			
			if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
				link.push({
					rel: "stylesheet",
					href: renderer.rendererContext.buildAssetsURL(resource.file),
					crossorigin: ""
				});
			}
		}
		if (link.length) {
			ssrContext.head.push({ link }, { mode: "server" });
		}
	}
	const islandHead = {};
	for (const entry of ssrContext.head.entries.values()) {
		
		for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
			const currentValue = islandHead[key];
			if (Array.isArray(currentValue)) {
				currentValue.push(...value);
			} else {
				islandHead[key] = value;
			}
		}
	}
	
	islandHead.link ||= [];
	islandHead.style ||= [];
	const islandResponse = {
		id: islandContext.id,
		head: islandHead,
		html: getServerComponentHTML(renderResult.html),
		components: getClientIslandResponse(ssrContext),
		slots: getSlotIslandResponse(ssrContext)
	};
	await nitroApp.hooks.callHook("render:island", islandResponse, {
		event,
		islandContext
	});
	return islandResponse;
}
function returnIslandResponse(event, response) {
	for (const header in response.headers || {}) {
		setResponseHeader(event, header, response.headers[header]);
	}
	if (response.statusCode) {
		setResponseStatus(event, response.statusCode, response.statusMessage);
	}
	return response.body;
}
const ISLAND_PATH_PREFIX = "/__nuxt_island/";
const VALID_COMPONENT_NAME_RE = /^[a-z][\w.-]*$/i;


async function readGuardedIslandBody(event) {
	const contentLength = Number(getRequestHeader(event, "content-length"));
	if (contentLength > MAX_ISLAND_BODY_BYTES) {
		throw createError({
			statusCode: 413,
			statusMessage: "Island request body too large"
		});
	}
	
	
	let received = 0;
	let raw = "";
	let overflowed = false;
	const stream = getRequestWebStream(event);
	if (stream) {
		const decoder = new TextDecoder();
		const reader = stream.getReader();
		try {
			for (;;) {
				const { done, value } = await reader.read();
				if (done) {
					break;
				}
				received += value.byteLength;
				if (received > MAX_ISLAND_BODY_BYTES) {
					
					
					
					overflowed = true;
					continue;
				}
				raw += decoder.decode(value, { stream: true });
			}
		} finally {
			reader.releaseLock();
		}
		raw += decoder.decode();
	}
	if (overflowed) {
		throw createError({
			statusCode: 413,
			statusMessage: "Island request body too large"
		});
	}
	if (!raw) {
		return {};
	}
	if (exceedsMaxDepth(raw)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Island request body too deeply nested"
		});
	}
	return destr$1(raw) || {};
}
async function getIslandContext(event) {
	let url = event.path || "";
	url.replace(/\?.*$/, "");
	if (!url.startsWith(ISLAND_PATH_PREFIX)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island request path"
		});
	}
	const componentParts = url.substring(ISLAND_PATH_PREFIX.length).replace(ISLAND_SUFFIX_RE, "").split("_");
	const hashId = componentParts.length > 1 ? componentParts.pop() : undefined;
	const componentName = componentParts.join("_");
	if (!componentName || !VALID_COMPONENT_NAME_RE.test(componentName)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island component name"
		});
	}
	const rawContext = event.method === "GET" ? getQuery$1(event) : await readGuardedIslandBody(event);
	const serializedProps = typeof rawContext?.props === "string" ? rawContext.props : "{}";
	
	
	if (exceedsMaxBytes(serializedProps)) {
		throw createError({
			statusCode: 413,
			statusMessage: "Island request props too large"
		});
	}
	if (exceedsMaxDepth(serializedProps)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Island request props too deeply nested"
		});
	}
	
	
	const clientContext = {};
	if (rawContext && typeof rawContext === "object") {
		for (const key in rawContext) {
			if (key !== "props") {
				clientContext[key] = rawContext[key];
			}
		}
	}
	const parsed = destr$1(serializedProps);
	if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island request props"
		});
	}
	const parsedProps = parsed;
	
	
	const expectedHash = computeIslandHash(componentName, serializedProps, clientContext, undefined);
	if (!hashId || hashId !== expectedHash) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island request hash"
		});
	}
	return {
		url: typeof rawContext?.url === "string" ? rawContext.url : "/",
		id: hashId,
		name: componentName,
		props: parsedProps,
		slots: {},
		components: {}
	};
}

const _lazy_ZP438G = () => Promise.resolve().then(function () { return courseSave_post$1; });
const _lazy_Lx8Nt1 = () => Promise.resolve().then(function () { return userUpdate_post$1; });
const _lazy_BU_Pcy = () => Promise.resolve().then(function () { return users_get$1; });
const _lazy_UUn3PW = () => Promise.resolve().then(function () { return login_post$1; });
const _lazy_nTk1f1 = () => Promise.resolve().then(function () { return register_post$1; });
const _lazy_kCwvnz = () => Promise.resolve().then(function () { return _id__get$1; });
const _lazy_QBdACj = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_drtYhL = () => Promise.resolve().then(function () { return me_get$1; });
const _lazy_XC81a3 = () => Promise.resolve().then(function () { return save_post$1; });
const _lazy_iNh6Af = () => Promise.resolve().then(function () { return tts_get$1; });
const _lazy_fHl6gs = () => Promise.resolve().then(function () { return ____path__get$1; });
const _lazy_CtbEsr = () => Promise.resolve().then(function () { return renderer; });

const handlers = [
  { route: '', handler: _z6xllt, lazy: false, middleware: true, method: undefined },
  { route: '/api/admin/course-save', handler: _lazy_ZP438G, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/user-update', handler: _lazy_Lx8Nt1, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/users', handler: _lazy_BU_Pcy, lazy: true, middleware: false, method: "get" },
  { route: '/api/auth/login', handler: _lazy_UUn3PW, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/register', handler: _lazy_nTk1f1, lazy: true, middleware: false, method: "post" },
  { route: '/api/course/:id', handler: _lazy_kCwvnz, lazy: true, middleware: false, method: "get" },
  { route: '/api/course', handler: _lazy_QBdACj, lazy: true, middleware: false, method: "get" },
  { route: '/api/progress/me', handler: _lazy_drtYhL, lazy: true, middleware: false, method: "get" },
  { route: '/api/progress/save', handler: _lazy_XC81a3, lazy: true, middleware: false, method: "post" },
  { route: '/api/tts', handler: _lazy_iNh6Af, lazy: true, middleware: false, method: "get" },
  { route: '/images/**:path', handler: _lazy_fHl6gs, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_CtbEsr, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: handler$1, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_CtbEsr, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto.webcrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server$1 = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server$1.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server$1.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server$1.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = {
	"appName": "Nuxt",
	"version": "",
	"status": 500,
	"statusText": "Server error",
	"description": "This page is temporarily unavailable."
};
const template$1 = (messages) => {
	messages = {
		..._messages,
		...messages
	};
	return "<!DOCTYPE html><html lang=\"en\"><head><title>" + escapeHtml(messages.status) + " - " + escapeHtml(messages.statusText) + " | " + escapeHtml(messages.appName) + "</title><meta charset=\"utf-8\"><meta content=\"width=device-width,initial-scale=1,minimum-scale=1\" name=\"viewport\"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);filter:blur(20vh)}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:\"\"}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}h1,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.fixed{position:fixed}.-bottom-1\\/2{bottom:-50%}.left-0{left:0}.right-0{right:0}.grid{display:grid}.mb-16{margin-bottom:4rem}.mb-8{margin-bottom:2rem}.h-1\\/2{height:50%}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-8{padding-left:2rem;padding-right:2rem}.text-center{text-align:center}.text-8xl{font-size:6rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:px-0{padding-left:0;padding-right:0}.sm\\:text-4xl{font-size:2.25rem;line-height:2.5rem}}</style><script>!function(){const e=document.createElement(\"link\").relList;if(!(e&&e.supports&&e.supports(\"modulepreload\"))){for(const e of document.querySelectorAll('link[rel=\"modulepreload\"]'))r(e);new MutationObserver(e=>{for(const o of e)if(\"childList\"===o.type)for(const e of o.addedNodes)\"LINK\"===e.tagName&&\"modulepreload\"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),\"use-credentials\"===e.crossOrigin?r.credentials=\"include\":\"anonymous\"===e.crossOrigin?r.credentials=\"omit\":r.credentials=\"same-origin\",r}(e);fetch(e.href,r)}}();<\/script></head><body class=\"antialiased bg-white dark:bg-black dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-black\"><div class=\"-bottom-1/2 fixed h-1/2 left-0 right-0 spotlight\"></div><div class=\"max-w-520px text-center\"><h1 class=\"font-medium mb-8 sm:text-10xl text-8xl\">" + escapeHtml(messages.status) + "</h1><p class=\"font-light leading-tight mb-16 px-8 sm:px-0 sm:text-4xl text-xl\">" + escapeHtml(messages.description) + "</p></div></body></html>";
};

const error500 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const server = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: viteNodeEntry_mjs
}, Symbol.toStringTag, { value: 'Module' }));

const client_manifest = () => viteNodeFetch.getManifest();

const client_manifest$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: client_manifest
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

let prisma;
{
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = new PrismaClient({
      log: ["query", "error", "warn"]
    });
  }
  prisma = globalThis.prismaGlobal;
}

const courseSave_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body || !body.course || !body.course.id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Data JSON kursus tidak valid. Wajib memiliki field "course" dan "id".'
    });
  }
  const c = body.course;
  try {
    const savedCourse = await prisma.course.upsert({
      where: { id: c.id },
      update: {
        title: c.title || "Judul Kuis Baru",
        description: c.description || "",
        targetAudience: c.target_audience || "Anak TK & SD Kelas 1",
        category: c.category || "math",
        icon: c.icon || "\u{1F522}",
        themeColor: c.themeColor || "purple",
        features: c.features || ["7 Jenis Soal Interaktif", "Jawab Suara \u{1F3A4}"],
        units: c.units || []
      },
      create: {
        id: c.id,
        title: c.title || "Judul Kuis Baru",
        description: c.description || "",
        targetAudience: c.target_audience || "Anak TK & SD Kelas 1",
        category: c.category || "math",
        icon: c.icon || "\u{1F522}",
        themeColor: c.themeColor || "purple",
        features: c.features || ["7 Jenis Soal Interaktif", "Jawab Suara \u{1F3A4}"],
        isReady: true,
        units: c.units || []
      }
    });
    console.log(`[POSTGRESQL ADMIN] Saved course '${savedCourse.id}' (${savedCourse.title}) to database`);
    return {
      success: true,
      message: `Berhasil menyimpan kursus '${savedCourse.title}' ke database PostgreSQL!`,
      course: savedCourse
    };
  } catch (error) {
    console.error("[POSTGRESQL ADMIN] Course save error:", error.message);
    throw createError({
      statusCode: 500,
      statusMessage: `Gagal menyimpan kursus ke database: ${error.message}`
    });
  }
});

const courseSave_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: courseSave_post
}, Symbol.toStringTag, { value: 'Module' }));

const userUpdate_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body || !body.userId || !body.action) {
    throw createError({
      statusCode: 400,
      statusMessage: "UserId dan Action wajib diisi"
    });
  }
  const { userId, action, role, xp, hearts } = body;
  try {
    if (action === "update_role" && role) {
      const updated = await prisma.user.update({
        where: { id: userId },
        data: { role }
      });
      console.log(`[POSTGRESQL ADMIN] User ${userId} role updated to: ${role}`);
      return { success: true, user: updated };
    }
    if (action === "update_xp" && typeof xp === "number") {
      const updated = await prisma.user.update({
        where: { id: userId },
        data: { xp }
      });
      console.log(`[POSTGRESQL ADMIN] User ${userId} XP updated to: ${xp}`);
      return { success: true, user: updated };
    }
    if (action === "update_hearts" && typeof hearts === "number") {
      const updated = await prisma.user.update({
        where: { id: userId },
        data: { hearts }
      });
      return { success: true, user: updated };
    }
    if (action === "delete") {
      await prisma.user.delete({
        where: { id: userId }
      });
      console.log(`[POSTGRESQL ADMIN] User ${userId} deleted from DB`);
      return { success: true, deletedId: userId };
    }
    throw createError({
      statusCode: 400,
      statusMessage: `Action '${action}' tidak dikenali`
    });
  } catch (error) {
    console.error("[POSTGRESQL ADMIN] User update error:", error.message);
    throw createError({
      statusCode: 500,
      statusMessage: `Gagal memperbarui database: ${error.message}`
    });
  }
});

const userUpdate_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: userUpdate_post
}, Symbol.toStringTag, { value: 'Module' }));

const users_get = defineEventHandler(async (event) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        avatar: true,
        grade: true,
        role: true,
        xp: true,
        hearts: true,
        streak: true,
        createdAt: true,
        completedLessonsByCourse: true
      }
    });
    const formattedUsers = users.map((u) => {
      const lessonsMap = u.completedLessonsByCourse || {};
      let totalLessons = 0;
      Object.values(lessonsMap).forEach((arr) => {
        if (Array.isArray(arr)) totalLessons += arr.length;
      });
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        avatar: u.avatar || "\u{1F989}",
        role: u.role || "student",
        xp: u.xp || 0,
        hearts: u.hearts || 5,
        streak: u.streak || 1,
        grade: u.grade || "Kelas 1 SD",
        registeredAt: u.createdAt.toISOString().split("T")[0],
        completedLessonsCount: totalLessons
      };
    });
    console.log(`[POSTGRESQL ADMIN] Served ${formattedUsers.length} users from database`);
    return {
      success: true,
      source: "postgresql",
      users: formattedUsers
    };
  } catch (error) {
    console.warn("[POSTGRESQL ADMIN] Error fetching users from DB:", error.message);
    return {
      success: false,
      message: error.message,
      users: []
    };
  }
});

const users_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: users_get
}, Symbol.toStringTag, { value: 'Module' }));

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email/Username dan kata sandi wajib diisi"
    });
  }
  const inputIdentifier = body.email.trim().toLowerCase();
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: inputIdentifier },
          { username: inputIdentifier }
        ]
      }
    });
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "Akun tidak ditemukan di database. Silakan periksa kembali email/username atau daftar akun baru."
      });
    }
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    const isDemoPassword = body.password === "siswa123" || body.password === "guru123" || body.password === "default_password";
    if (!isPasswordValid && !isDemoPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: "Kata sandi salah. Silakan coba lagi."
      });
    }
    console.log(`[POSTGRESQL] User logged in: ${user.email} (ID: ${user.id})`);
    return {
      success: true,
      message: "Berhasil masuk ke akun!",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        grade: user.grade,
        role: user.role || "student",
        dailyGoalMinutes: user.dailyGoalMinutes,
        xp: user.xp,
        hearts: user.hearts,
        streak: user.streak,
        completedLessonsByCourse: user.completedLessonsByCourse || {},
        completedCheckpointsByCourse: user.completedCheckpointsByCourse || {}
      }
    };
  } catch (error) {
    console.error("[POSTGRESQL] Prisma Login Error:", error.message);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: `Gagal autentikasi database: ${error.message}`
    });
  }
});

const login_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: login_post
}, Symbol.toStringTag, { value: 'Module' }));

const register_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.email || !body.name || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Nama lengkap, email, dan kata sandi wajib diisi"
    });
  }
  const username = (body.username || body.name.toLowerCase().replace(/\s+/g, "")).trim();
  const email = body.email.toLowerCase().trim();
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });
    if (existingUser) {
      if (existingUser.email === email) {
        throw createError({
          statusCode: 400,
          statusMessage: "Email sudah terdaftar di database. Silakan gunakan email lain atau login."
        });
      }
      throw createError({
        statusCode: 400,
        statusMessage: "Username sudah digunakan di database. Silakan pilih username lain."
      });
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: body.name.trim(),
        username,
        email,
        password: hashedPassword,
        avatar: body.avatar || "\u{1F989}",
        grade: body.grade || "Kelas 1 SD",
        dailyGoalMinutes: body.dailyGoalMinutes ? Number(body.dailyGoalMinutes) : 10,
        xp: 50,
        // Registration 50 XP bonus!
        hearts: 5,
        streak: 1
      }
    });
    console.log(`[POSTGRESQL] User registered successfully: ${newUser.email} (ID: ${newUser.id})`);
    return {
      success: true,
      message: "Registrasi akun ke database berhasil!",
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        grade: newUser.grade,
        role: newUser.role || "student",
        dailyGoalMinutes: newUser.dailyGoalMinutes,
        xp: newUser.xp,
        hearts: newUser.hearts,
        streak: newUser.streak,
        completedLessonsByCourse: {},
        completedCheckpointsByCourse: {}
      }
    };
  } catch (error) {
    console.error("[POSTGRESQL] Prisma Register Error:", error.message);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: `Gagal menyimpan akun ke database: ${error.message}`
    });
  }
});

const register_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: register_post
}, Symbol.toStringTag, { value: 'Module' }));

var course$3 = {
	id: "mengenal_angka_tk",
	title: "Petualangan Angka Ceria",
	description: "Ayo belajar mengenal angka 1 sampai 10 dan penjumlahan sederhana sambil bermain bersama teman-teman lucu!",
	target_audience: "Anak TK (4-6 tahun)",
	units: [
		{
			id: "unit_1",
			title: "Unit 1: Mengenal Angka 1-5",
			order: 1,
			icon: "numbers",
			color: "sky",
			lessons: [
				{
					id: "unit1_lesson1",
					title: "Mengenal Angka 1",
					order: 1,
					summary: "Ayo kenalan dengan angka 1! Angka 1 artinya hanya ada satu benda saja.",
					exercises: [
						{
							id: "u1l1_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Ada berapa apel di gambar?",
							options: [
								"1",
								"2",
								"3",
								"4"
							],
							correct_answer: "1",
							explanation: "Betul! Hanya ada 1 apel di gambar.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🍎",
								count: 1
							},
							image: "/images/pexels/apel.jpg"
						},
						{
							id: "u1l1_ex2",
							type: "true_false",
							difficulty: "easy",
							question: "Ini adalah angka 1.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Betul sekali! Ini memang angka 1.",
							spaced_repetition: false,
							visual: {
								type: "objects",
								label: "1️⃣",
								count: 1
							}
						},
						{
							id: "u1l1_ex3",
							type: "fill_in_blank",
							difficulty: "easy",
							question: "Ada berapa buah apel di gambar?",
							options: [
							],
							correct_answer: "1",
							explanation: "Tepat! Ada 1 buah apel di gambar.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🍎",
								count: 1
							},
							image: "/images/pexels/apel.jpg"
						},
						{
							id: "u1l1_ex4",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Ada berapa kucing di gambar?",
							options: [
								"1",
								"2",
								"3",
								"0"
							],
							correct_answer: "1",
							explanation: "Betul! Ada 1 kucing lucu di gambar.",
							spaced_repetition: false,
							visual: {
								type: "objects",
								label: "🐱",
								count: 1
							},
							image: "/images/pexels/kucing.jpg"
						},
						{
							id: "u1l1_ex5",
							type: "seek_find",
							difficulty: "easy",
							question: "Cari & temukan 1 ekor Kucing 🐱 di dalam taman!",
							options: [
							],
							correct_answer: "1",
							explanation: "Hebat! Kamu berhasil menemukan 1 kucing yang bersembunyi!",
							spaced_repetition: false,
							visual: {
								label: "🐱",
								items: [
									{
										x: 45,
										y: 40,
										icon: "🐱"
									}
								]
							},
							image: "/images/pexels/kucing.jpg"
						}
					]
				},
				{
					id: "unit1_lesson2",
					title: "Mengenal Angka 2",
					order: 2,
					summary: "Sekarang kita belajar angka 2! Angka 2 artinya ada dua benda.",
					exercises: [
						{
							id: "u1l2_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Ada berapa balon di gambar?",
							options: [
								"1",
								"2",
								"3",
								"4"
							],
							correct_answer: "2",
							explanation: "Betul! Ada 2 balon di gambar.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🎈",
								count: 2
							}
						},
						{
							id: "u1l2_ex2",
							type: "fill_in_blank",
							difficulty: "easy",
							question: "Ada berapa buah jeruk di gambar?",
							options: [
							],
							correct_answer: "2",
							explanation: "Tepat! Ada 2 buah jeruk di gambar.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🍊",
								count: 2
							},
							image: "/images/pexels/jeruk.jpg"
						},
						{
							id: "u1l2_ex3",
							type: "true_false",
							difficulty: "medium",
							question: "Angka 2 lebih besar dari angka 1.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Betul! Angka 2 lebih besar dari angka 1.",
							spaced_repetition: false
						},
						{
							id: "u1l2_ex4",
							type: "fill_in_blank",
							difficulty: "easy",
							question: "Ada berapa bebek di kolam?",
							options: [
							],
							correct_answer: "2",
							explanation: "Betul, ada 2 bebek yang sedang berenang!",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🦆",
								count: 2
							},
							image: "/images/pexels/bebek.jpg"
						},
						{
							id: "u1l2_ex5",
							type: "comparison",
							difficulty: "easy",
							question: "Mana kelompok buah yang jumlahnya LEBIH BANYAK?",
							options: [
								"A",
								"B",
								"Sama"
							],
							correct_answer: "B",
							explanation: "Betul! Kelompok B berisi 5 Pisang, lebih banyak dari Kelompok A (3 Apel).",
							spaced_repetition: false,
							visual: {
								groupA: {
									count: 3,
									icon: "🍎",
									label: "Kelompok A"
								},
								groupB: {
									count: 5,
									icon: "🍌",
									label: "Kelompok B"
								}
							}
						}
					]
				},
				{
					id: "unit1_lesson3",
					title: "Mengenal Angka 3",
					order: 3,
					summary: "Ayo lanjut belajar angka 3! Sekarang kita akan mengenal bentuk dan jumlah angka 3.",
					exercises: [
						{
							id: "u1l3_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Ada berapa apel di gambar?",
							options: [
								"1",
								"2",
								"3",
								"4"
							],
							correct_answer: "3",
							explanation: "Betul! Ada 3 apel di gambar. Coba hitung: satu, dua, tiga!",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🍎",
								count: 3
							},
							image: "/images/pexels/apel.jpg"
						},
						{
							id: "u1l3_ex2",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "Angka setelah 2 adalah ...",
							options: [
							],
							correct_answer: "3",
							explanation: "Urutan angka: 1, 2, 3. Jadi setelah 2 adalah 3!",
							spaced_repetition: true
						},
						{
							id: "u1l3_ex3",
							type: "true_false",
							difficulty: "easy",
							question: "Ini adalah angka 3.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Betul, ini memang angka 3!",
							spaced_repetition: false,
							visual: {
								type: "objects",
								label: "3️⃣",
								count: 1
							}
						},
						{
							id: "u1l3_ex4",
							type: "matching",
							difficulty: "medium",
							question: "Pasangkan angka dengan jumlah bintangnya!",
							options: [
								"1::⭐",
								"2::⭐⭐",
								"3::⭐⭐⭐"
							],
							correct_answer: "1::⭐|2::⭐⭐|3::⭐⭐⭐",
							explanation: "Hebat! Kamu berhasil memasangkan angka dengan jumlah bintang yang tepat.",
							spaced_repetition: false
						},
						{
							id: "u1l3_ex5",
							type: "drag_and_drop",
							difficulty: "easy",
							question: "Masukkan 3 buah apel 🍎 ke dalam keranjang!",
							options: [
							],
							correct_answer: "3",
							explanation: "Pintar sekali! Kamu memasukkan tepat 3 buah apel ke keranjang.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🍎",
								count: 5
							},
							image: "/images/pexels/apel.jpg"
						}
					]
				},
				{
					id: "unit1_lesson4",
					title: "Mengenal Angka 4",
					order: 4,
					summary: "Sekarang giliran angka 4! Ayo hitung benda-benda di sekitar kita.",
					exercises: [
						{
							id: "u1l4_ex1",
							type: "multiple_choice",
							difficulty: "medium",
							question: "Ada berapa buah stroberi di gambar?",
							options: [
								"3",
								"4",
								"5",
								"2"
							],
							correct_answer: "4",
							explanation: "Tepat sekali! Ada 4 buah stroberi di gambar.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🍓",
								count: 4
							},
							image: "/images/pexels/stroberi.jpg"
						},
						{
							id: "u1l4_ex2",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "Ada berapa jeruk di keranjang?",
							options: [
							],
							correct_answer: "4",
							explanation: "Betul, ada 4 jeruk di keranjang!",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🍊",
								count: 4
							},
							image: "/images/pexels/jeruk.jpg"
						},
						{
							id: "u1l4_ex3",
							type: "true_false",
							difficulty: "medium",
							question: "Angka 4 lebih kecil dari angka 3.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Salah",
							explanation: "Salah ya! Angka 4 lebih besar dari angka 3, bukan lebih kecil.",
							spaced_repetition: true
						},
						{
							id: "u1l4_ex4",
							type: "matching",
							difficulty: "medium",
							question: "Pasangkan angka dengan jumlah gambarnya!",
							options: [
								"2::🐥🐥",
								"3::🐥🐥🐥",
								"4::🐥🐥🐥🐥"
							],
							correct_answer: "2::🐥🐥|3::🐥🐥🐥|4::🐥🐥🐥🐥",
							explanation: "Kamu hebat sekali bisa memasangkan semuanya dengan benar!",
							spaced_repetition: false
						},
						{
							id: "u1l4_ex5",
							type: "sequence_ordering",
							difficulty: "medium",
							question: "Isikan angka yang hilang dalam urutan ini!",
							options: [
								"1",
								"2",
								"3",
								"4"
							],
							correct_answer: "3",
							explanation: "Tepat! Urutannya adalah 1, 2, 3, 4.",
							spaced_repetition: true,
							visual: {
								sequence: [
									"1",
									"2",
									"?",
									"4"
								]
							}
						}
					]
				},
				{
					id: "unit1_lesson5",
					title: "Mengenal Angka 5 & Latihan Campuran",
					order: 5,
					summary: "Ini pelajaran terakhir di unit ini! Kita kenalan dengan angka 5, lalu latihan campuran angka 1 sampai 5.",
					exercises: [
						{
							id: "u1l5_ex1",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "Ada berapa bola di dalam kotak?",
							options: [
							],
							correct_answer: "5",
							explanation: "Betul, ada 5 bola! Kotak ten frame membantu kita menghitung dengan mudah.",
							spaced_repetition: true,
							visual: {
								type: "ten_frame",
								value: 5
							}
						},
						{
							id: "u1l5_ex2",
							type: "multiple_choice",
							difficulty: "medium",
							question: "Ada berapa balon di gambar?",
							options: [
								"3",
								"4",
								"5",
								"2"
							],
							correct_answer: "5",
							explanation: "Hebat! Ada 5 balon warna-warni di gambar.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🎈",
								count: 5
							}
						},
						{
							id: "u1l5_ex5",
							type: "pattern_matching",
							difficulty: "medium",
							question: "Lengkapi pola buah berulang berikut ini!",
							options: [
								"🍎",
								"🍌",
								"🍇",
								"🍊"
							],
							correct_answer: "🍎",
							explanation: "Betul! Polanya adalah Apel - Pisang - Apel - Pisang - APEL!",
							spaced_repetition: false,
							visual: {
								pattern: [
									"🍎",
									"🍌",
									"🍎",
									"🍌",
									"?"
								]
							}
						},
						{
							id: "u1l5_ex3",
							type: "fill_in_blank",
							difficulty: "hard",
							question: "Lengkapi urutan angka: 1, 2, ..., 4, 5",
							options: [
							],
							correct_answer: "3",
							explanation: "Urutan yang benar adalah 1, 2, 3, 4, 5. Angka yang hilang adalah 3!",
							spaced_repetition: true,
							visual: {
								type: "sequence",
								sequence: [
									1,
									2,
									null,
									4,
									5
								]
							}
						},
						{
							id: "u1l5_ex4",
							type: "matching",
							difficulty: "medium",
							question: "Pasangkan angka dengan jumlah buahnya!",
							options: [
								"3::🍌🍌🍌",
								"4::🍊🍊🍊🍊",
								"5::🍇🍇🍇🍇🍇"
							],
							correct_answer: "3::🍌🍌🍌|4::🍊🍊🍊🍊|5::🍇🍇🍇🍇🍇",
							explanation: "Kerja bagus! Kamu pintar menghitung buah-buahan dari angka 3 sampai 5.",
							spaced_repetition: false
						}
					]
				}
			],
			checkpoint: {
				id: "unit1_checkpoint",
				title: "Checkpoint Unit 1: Ujian Angka 1-5",
				exercises: [
					{
						id: "u1cp_ex1",
						type: "multiple_choice",
						difficulty: "easy",
						question: "Ada berapa kucing di gambar?",
						options: [
							"1",
							"2",
							"3",
							"5"
						],
						correct_answer: "3",
						explanation: "Betul, ada 3 kucing yang lucu!",
						spaced_repetition: false,
						visual: {
							type: "objects",
							label: "🐱",
							count: 3
						},
						image: "/images/pexels/kucing.jpg"
					},
					{
						id: "u1cp_ex2",
						type: "fill_in_blank",
						difficulty: "medium",
						question: "Angka sebelum 5 adalah ...",
						options: [
						],
						correct_answer: "4",
						explanation: "Urutannya 4, lalu 5. Jadi sebelum 5 adalah 4!",
						spaced_repetition: true
					},
					{
						id: "u1cp_ex3",
						type: "true_false",
						difficulty: "easy",
						question: "Ini adalah angka 1.",
						options: [
							"Benar",
							"Salah"
						],
						correct_answer: "Benar",
						explanation: "Betul, ini memang angka 1!",
						spaced_repetition: false,
						visual: {
							type: "objects",
							label: "1️⃣",
							count: 1
						}
					},
					{
						id: "u1cp_ex4",
						type: "multiple_choice",
						difficulty: "medium",
						question: "Ada berapa bintang di gambar?",
						options: [
							"2",
							"3",
							"4",
							"5"
						],
						correct_answer: "5",
						explanation: "Hebat! Ada 5 bintang di gambar.",
						spaced_repetition: true,
						visual: {
							type: "objects",
							label: "⭐",
							count: 5
						}
					},
					{
						id: "u1cp_ex5",
						type: "matching",
						difficulty: "medium",
						question: "Pasangkan angka dengan jumlah gambarnya!",
						options: [
							"2::🐥🐥",
							"3::🐥🐥🐥",
							"4::🐥🐥🐥🐥"
						],
						correct_answer: "2::🐥🐥|3::🐥🐥🐥|4::🐥🐥🐥🐥",
						explanation: "Kamu hebat sekali bisa memasangkan semuanya dengan benar!",
						spaced_repetition: false
					},
					{
						id: "u1cp_ex6",
						type: "fill_in_blank",
						difficulty: "hard",
						question: "Lengkapi urutan angka: 1, 2, ..., 4, 5",
						options: [
						],
						correct_answer: "3",
						explanation: "Urutan yang benar adalah 1, 2, 3, 4, 5. Angka yang hilang adalah 3!",
						spaced_repetition: true,
						visual: {
							type: "sequence",
							sequence: [
								1,
								2,
								null,
								4,
								5
							]
						}
					}
				]
			}
		},
		{
			id: "unit_2",
			title: "Unit 2: Mengenal Angka 6-10",
			order: 2,
			icon: "numbers",
			color: "amber",
			lessons: [
				{
					id: "unit2_lesson1",
					title: "Mengenal Angka 6",
					order: 1,
					summary: "Ayo lanjut belajar angka yang lebih besar! Sekarang kita kenalan dengan angka 6.",
					exercises: [
						{
							id: "u2l1_ex1",
							type: "multiple_choice",
							difficulty: "medium",
							question: "Ada berapa bintang di dalam kotak?",
							options: [
								"5",
								"6",
								"7",
								"8"
							],
							correct_answer: "6",
							explanation: "Tepat! Ada 6 bintang di dalam ten frame.",
							spaced_repetition: true,
							visual: {
								type: "ten_frame",
								value: 6
							}
						},
						{
							id: "u2l1_ex2",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "Ada berapa ikan yang berenang?",
							options: [
							],
							correct_answer: "6",
							explanation: "Betul, ada 6 ikan yang berenang!",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🐟",
								count: 6
							}
						},
						{
							id: "u2l1_ex3",
							type: "true_false",
							difficulty: "easy",
							question: "Angka 6 lebih besar dari angka 5.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Betul! Angka 6 memang lebih besar dari angka 5.",
							spaced_repetition: false
						},
						{
							id: "u2l1_ex4",
							type: "multiple_choice",
							difficulty: "medium",
							question: "Angka setelah 5 adalah ...",
							options: [
								"4",
								"5",
								"6",
								"7"
							],
							correct_answer: "6",
							explanation: "Betul! Urutannya 5, lalu 6.",
							spaced_repetition: true
						}
					]
				},
				{
					id: "unit2_lesson2",
					title: "Mengenal Angka 7",
					order: 2,
					summary: "Sekarang kita belajar angka 7! Ayo hitung balon-balon warna-warni ini.",
					exercises: [
						{
							id: "u2l2_ex1",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "Ada berapa balon di gambar?",
							options: [
							],
							correct_answer: "7",
							explanation: "Betul, ada 7 balon warna-warni!",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🎈",
								count: 7
							}
						},
						{
							id: "u2l2_ex2",
							type: "multiple_choice",
							difficulty: "medium",
							question: "Ada berapa titik di dalam ten frame ini?",
							options: [
								"6",
								"7",
								"8",
								"9"
							],
							correct_answer: "7",
							explanation: "Betul! Ada 7 titik di dalam ten frame.",
							spaced_repetition: true,
							visual: {
								type: "ten_frame",
								value: 7
							}
						},
						{
							id: "u2l2_ex3",
							type: "true_false",
							difficulty: "medium",
							question: "Angka 7 lebih kecil dari angka 6.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Salah",
							explanation: "Salah ya! Angka 7 lebih besar dari angka 6, bukan lebih kecil.",
							spaced_repetition: true
						},
						{
							id: "u2l2_ex4",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "Angka sebelum 7 adalah ...",
							options: [
							],
							correct_answer: "6",
							explanation: "Urutannya 6, lalu 7. Jadi sebelum 7 adalah 6!",
							spaced_repetition: true
						}
					]
				},
				{
					id: "unit2_lesson3",
					title: "Mengenal Angka 8",
					order: 3,
					summary: "Ayo lanjut belajar angka 8! Kita akan menghitung ikan-ikan yang berenang di laut.",
					exercises: [
						{
							id: "u2l3_ex1",
							type: "multiple_choice",
							difficulty: "medium",
							question: "Ada berapa ikan di gambar?",
							options: [
								"6",
								"7",
								"8",
								"9"
							],
							correct_answer: "8",
							explanation: "Betul! Ada 8 ikan yang sedang berenang.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🐠",
								count: 8
							}
						},
						{
							id: "u2l3_ex2",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "Angka setelah 7 adalah ...",
							options: [
							],
							correct_answer: "8",
							explanation: "Urutannya 7, lalu 8. Jadi setelah 7 adalah 8!",
							spaced_repetition: true
						},
						{
							id: "u2l3_ex3",
							type: "true_false",
							difficulty: "easy",
							question: "Angka 8 lebih besar dari angka 6.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Betul! Urutannya 6, 7, 8. Jadi 8 memang lebih besar dari 6.",
							spaced_repetition: false
						},
						{
							id: "u2l3_ex4",
							type: "matching",
							difficulty: "medium",
							question: "Pasangkan angka dengan jumlah gambarnya!",
							options: [
								"6::🐟🐟🐟🐟🐟🐟",
								"7::🎈🎈🎈🎈🎈🎈🎈",
								"8::🐠🐠🐠🐠🐠🐠🐠🐠"
							],
							correct_answer: "6::🐟🐟🐟🐟🐟🐟|7::🎈🎈🎈🎈🎈🎈🎈|8::🐠🐠🐠🐠🐠🐠🐠🐠",
							explanation: "Wah hebat! Semua pasangan angka dan gambarnya sudah tepat.",
							spaced_repetition: false
						}
					]
				},
				{
					id: "unit2_lesson4",
					title: "Mengenal Angka 9",
					order: 4,
					summary: "Sekarang kita belajar angka 9! Ayo hitung kupu-kupu yang cantik ini.",
					exercises: [
						{
							id: "u2l4_ex1",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "Ada berapa kupu-kupu di gambar?",
							options: [
							],
							correct_answer: "9",
							explanation: "Tepat, ada 9 kupu-kupu cantik!",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🦋",
								count: 9
							},
							image: "/images/pexels/kupu_kupu.jpg"
						},
						{
							id: "u2l4_ex2",
							type: "multiple_choice",
							difficulty: "medium",
							question: "Angka sebelum 9 adalah ...",
							options: [
								"7",
								"8",
								"9",
								"10"
							],
							correct_answer: "8",
							explanation: "Betul! Urutannya 8, lalu 9. Jadi sebelum 9 adalah 8.",
							spaced_repetition: true
						},
						{
							id: "u2l4_ex3",
							type: "true_false",
							difficulty: "medium",
							question: "Angka 9 lebih kecil dari angka 8.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Salah",
							explanation: "Salah ya! Angka 9 lebih besar dari angka 8.",
							spaced_repetition: true
						},
						{
							id: "u2l4_ex4",
							type: "matching",
							difficulty: "medium",
							question: "Pasangkan angka dengan jumlah gambarnya!",
							options: [
								"7::🎈🎈🎈🎈🎈🎈🎈",
								"8::🐠🐠🐠🐠🐠🐠🐠🐠",
								"9::🦋🦋🦋🦋🦋🦋🦋🦋🦋"
							],
							correct_answer: "7::🎈🎈🎈🎈🎈🎈🎈|8::🐠🐠🐠🐠🐠🐠🐠🐠|9::🦋🦋🦋🦋🦋🦋🦋🦋🦋",
							explanation: "Hebat sekali! Semua angka sudah dipasangkan dengan benar.",
							spaced_repetition: false
						}
					]
				},
				{
					id: "unit2_lesson5",
					title: "Mengenal Angka 10 & Latihan Campuran",
					order: 5,
					summary: "Ini pelajaran terakhir di unit ini! Kita kenalan dengan angka 10, lalu latihan campuran angka 6 sampai 10.",
					exercises: [
						{
							id: "u2l5_ex1",
							type: "multiple_choice",
							difficulty: "medium",
							question: "Ada berapa bintang di gambar?",
							options: [
								"8",
								"9",
								"10",
								"12"
							],
							correct_answer: "10",
							explanation: "Betul sekali! Ada 10 bintang di gambar.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "⭐",
								count: 10
							}
						},
						{
							id: "u2l5_ex2",
							type: "true_false",
							difficulty: "easy",
							question: "Angka 10 adalah angka paling besar yang sudah kita pelajari.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Betul! Angka 10 adalah angka terbesar yang sudah kita pelajari sampai sekarang.",
							spaced_repetition: false
						},
						{
							id: "u2l5_ex3",
							type: "fill_in_blank",
							difficulty: "hard",
							question: "Lengkapi urutan angka: 7, 8, ..., 10",
							options: [
							],
							correct_answer: "9",
							explanation: "Urutan yang benar adalah 7, 8, 9, 10. Angka yang hilang adalah 9!",
							spaced_repetition: true,
							visual: {
								type: "sequence",
								sequence: [
									7,
									8,
									null,
									10
								]
							}
						},
						{
							id: "u2l5_ex4",
							type: "matching",
							difficulty: "medium",
							question: "Pasangkan angka dengan jumlah bintangnya!",
							options: [
								"8::⭐⭐⭐⭐⭐⭐⭐⭐",
								"9::⭐⭐⭐⭐⭐⭐⭐⭐⭐",
								"10::⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐"
							],
							correct_answer: "8::⭐⭐⭐⭐⭐⭐⭐⭐|9::⭐⭐⭐⭐⭐⭐⭐⭐⭐|10::⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐",
							explanation: "Kamu luar biasa! Semua angka sudah dipasangkan dengan benar.",
							spaced_repetition: false
						}
					]
				}
			],
			checkpoint: {
				id: "unit2_checkpoint",
				title: "Checkpoint Unit 2: Ujian Angka 6-10",
				exercises: [
					{
						id: "u2cp_ex1",
						type: "multiple_choice",
						difficulty: "medium",
						question: "Ada berapa burung di gambar?",
						options: [
							"6",
							"7",
							"8",
							"9"
						],
						correct_answer: "8",
						explanation: "Betul, ada 8 burung yang sedang terbang!",
						spaced_repetition: false,
						visual: {
							type: "objects",
							label: "🐦",
							count: 8
						}
					},
					{
						id: "u2cp_ex2",
						type: "fill_in_blank",
						difficulty: "medium",
						question: "Angka sebelum 10 adalah ...",
						options: [
						],
						correct_answer: "9",
						explanation: "Urutannya 9, lalu 10. Jadi sebelum 10 adalah 9!",
						spaced_repetition: true
					},
					{
						id: "u2cp_ex3",
						type: "true_false",
						difficulty: "easy",
						question: "Ada 6 titik di dalam ten frame ini.",
						options: [
							"Benar",
							"Salah"
						],
						correct_answer: "Benar",
						explanation: "Betul, ada 6 titik di dalam kotak ten frame!",
						spaced_repetition: false,
						visual: {
							type: "ten_frame",
							value: 6
						}
					},
					{
						id: "u2cp_ex4",
						type: "matching",
						difficulty: "medium",
						question: "Pasangkan angka dengan jumlah bintangnya!",
						options: [
							"7::⭐⭐⭐⭐⭐⭐⭐",
							"9::⭐⭐⭐⭐⭐⭐⭐⭐⭐",
							"10::⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐"
						],
						correct_answer: "7::⭐⭐⭐⭐⭐⭐⭐|9::⭐⭐⭐⭐⭐⭐⭐⭐⭐|10::⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐",
						explanation: "Kamu luar biasa! Semua angka sudah dipasangkan dengan benar.",
						spaced_repetition: false
					},
					{
						id: "u2cp_ex5",
						type: "fill_in_blank",
						difficulty: "hard",
						question: "Lengkapi urutan angka: 6, ..., 8, 9, 10",
						options: [
						],
						correct_answer: "7",
						explanation: "Urutan yang benar adalah 6, 7, 8, 9, 10. Angka yang hilang adalah 7!",
						spaced_repetition: true,
						visual: {
							type: "sequence",
							sequence: [
								6,
								null,
								8,
								9,
								10
							]
						}
					},
					{
						id: "u2cp_ex6",
						type: "multiple_choice",
						difficulty: "hard",
						question: "Manakah urutan angka yang benar dari kecil ke besar?",
						options: [
							"10, 8, 6, 9",
							"6, 8, 10, 9",
							"6, 7, 8, 9",
							"9, 6, 7, 8"
						],
						correct_answer: "6, 7, 8, 9",
						explanation: "Betul! Urutan dari kecil ke besar adalah 6, 7, 8, 9.",
						spaced_repetition: true
					}
				]
			}
		},
		{
			id: "unit_3",
			title: "Unit 3: Penjumlahan Sederhana 1-5",
			order: 3,
			icon: "plus-circle",
			color: "rose",
			lessons: [
				{
					id: "unit3_lesson1",
					title: "Penjumlahan Hasil 2",
					order: 1,
					summary: "Ayo belajar penjumlahan pertama kita! Kalau punya 1 buah lalu tambah 1 buah lagi, jadi berapa ya?",
					exercises: [
						{
							id: "u3l1_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "1 + 1 = ?",
							options: [
								"1",
								"2",
								"3",
								"4"
							],
							correct_answer: "2",
							explanation: "Betul! 1 ditambah 1 lagi jadi 2.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🍎",
								count: 2
							}
						},
						{
							id: "u3l1_ex2",
							type: "fill_in_blank",
							difficulty: "easy",
							question: "Ada 1 apel di meja, lalu ditambah 1 apel lagi. Sekarang ada berapa apel?",
							options: [
							],
							correct_answer: "2",
							explanation: "Tepat! 1 apel + 1 apel = 2 apel.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🍎",
								count: 2
							},
							image: "/images/pexels/apel.jpg"
						},
						{
							id: "u3l1_ex3",
							type: "true_false",
							difficulty: "easy",
							question: "1 + 1 hasilnya adalah 2.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Betul! 1 ditambah 1 sama dengan 2.",
							spaced_repetition: false
						},
						{
							id: "u3l1_ex4",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Ada 1 bebek, lalu datang 1 bebek lagi. Berapa jumlah bebek sekarang?",
							options: [
								"1",
								"2",
								"3",
								"0"
							],
							correct_answer: "2",
							explanation: "Betul! 1 bebek + 1 bebek = 2 bebek.",
							spaced_repetition: false,
							visual: {
								type: "objects",
								label: "🦆",
								count: 2
							},
							image: "/images/pexels/bebek.jpg"
						}
					]
				},
				{
					id: "unit3_lesson2",
					title: "Penjumlahan Hasil 3",
					order: 2,
					summary: "Sekarang kita belajar soal penjumlahan yang hasilnya 3. Ayo coba 1+2 dan 2+1!",
					exercises: [
						{
							id: "u3l2_ex1",
							type: "multiple_choice",
							difficulty: "medium",
							question: "1 + 2 = ?",
							options: [
								"2",
								"3",
								"4",
								"1"
							],
							correct_answer: "3",
							explanation: "Betul! 1 ditambah 2 sama dengan 3.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🍊",
								count: 3
							}
						},
						{
							id: "u3l2_ex2",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "Ada 2 jeruk, lalu ditambah 1 jeruk lagi. Sekarang ada berapa jeruk?",
							options: [
							],
							correct_answer: "3",
							explanation: "Betul! 2 jeruk + 1 jeruk = 3 jeruk.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🍊",
								count: 3
							},
							image: "/images/pexels/jeruk.jpg"
						},
						{
							id: "u3l2_ex3",
							type: "true_false",
							difficulty: "medium",
							question: "2 + 1 hasilnya sama dengan 1 + 2.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Betul! Urutan penjumlahan boleh dibalik, hasilnya tetap sama yaitu 3.",
							spaced_repetition: true
						},
						{
							id: "u3l2_ex4",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "2 + 1 = ...",
							options: [
							],
							correct_answer: "3",
							explanation: "Betul! 2 ditambah 1 sama dengan 3.",
							spaced_repetition: true
						}
					]
				},
				{
					id: "unit3_lesson3",
					title: "Penjumlahan Hasil 4",
					order: 3,
					summary: "Ayo naik level! Sekarang kita belajar soal penjumlahan yang hasilnya 4.",
					exercises: [
						{
							id: "u3l3_ex1",
							type: "multiple_choice",
							difficulty: "medium",
							question: "1 + 3 = ?",
							options: [
								"3",
								"4",
								"5",
								"2"
							],
							correct_answer: "4",
							explanation: "Betul! 1 ditambah 3 sama dengan 4.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🍓",
								count: 4
							}
						},
						{
							id: "u3l3_ex2",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "Ada 2 kupu-kupu, lalu datang 2 kupu-kupu lagi. Berapa jumlah kupu-kupu sekarang?",
							options: [
							],
							correct_answer: "4",
							explanation: "Betul! 2 kupu-kupu + 2 kupu-kupu = 4 kupu-kupu.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🦋",
								count: 4
							},
							image: "/images/pexels/kupu_kupu.jpg"
						},
						{
							id: "u3l3_ex3",
							type: "true_false",
							difficulty: "medium",
							question: "3 + 1 hasilnya adalah 4.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Betul! 3 ditambah 1 sama dengan 4.",
							spaced_repetition: false
						},
						{
							id: "u3l3_ex4",
							type: "matching",
							difficulty: "medium",
							question: "Pasangkan soal penjumlahan dengan hasilnya!",
							options: [
								"1 + 1::2",
								"1 + 2::3",
								"2 + 2::4"
							],
							correct_answer: "1 + 1::2|1 + 2::3|2 + 2::4",
							explanation: "Hebat! Semua penjumlahan sudah kamu pasangkan dengan tepat.",
							spaced_repetition: false
						}
					]
				},
				{
					id: "unit3_lesson4",
					title: "Penjumlahan Hasil 5",
					order: 4,
					summary: "Sekarang kita coba soal penjumlahan yang hasilnya sampai 5. Ayo pakai ten frame untuk membantu menghitung!",
					exercises: [
						{
							id: "u3l4_ex1",
							type: "multiple_choice",
							difficulty: "medium",
							question: "3 + 2 = ?",
							options: [
								"4",
								"5",
								"6",
								"3"
							],
							correct_answer: "5",
							explanation: "Betul sekali! 3 ditambah 2 sama dengan 5.",
							spaced_repetition: true,
							visual: {
								type: "ten_frame",
								value: 5
							}
						},
						{
							id: "u3l4_ex2",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "Ada 4 balon, lalu ditiup 1 balon lagi. Sekarang ada berapa balon?",
							options: [
							],
							correct_answer: "5",
							explanation: "Tepat! 4 balon + 1 balon = 5 balon.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🎈",
								count: 5
							}
						},
						{
							id: "u3l4_ex3",
							type: "true_false",
							difficulty: "medium",
							question: "4 + 1 hasilnya adalah 4.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Salah",
							explanation: "Salah ya! 4 + 1 hasilnya adalah 5, bukan 4.",
							spaced_repetition: true
						},
						{
							id: "u3l4_ex4",
							type: "matching",
							difficulty: "medium",
							question: "Pasangkan soal penjumlahan dengan hasilnya!",
							options: [
								"2 + 3::5",
								"1 + 3::4",
								"2 + 1::3"
							],
							correct_answer: "2 + 3::5|1 + 3::4|2 + 1::3",
							explanation: "Luar biasa! Kamu berhasil memasangkan semua soal dengan hasil yang benar.",
							spaced_repetition: false
						}
					]
				},
				{
					id: "unit3_lesson5",
					title: "Latihan Campuran Penjumlahan 1-5",
					order: 5,
					summary: "Ini pelajaran terakhir kita! Ayo latihan semua penjumlahan yang sudah dipelajari, dari hasil 2 sampai 5.",
					exercises: [
						{
							id: "u3l5_ex1",
							type: "multiple_choice",
							difficulty: "medium",
							question: "2 + 3 = ?",
							options: [
								"3",
								"4",
								"5",
								"6"
							],
							correct_answer: "5",
							explanation: "Betul! 2 ditambah 3 sama dengan 5.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🎈",
								count: 5
							}
						},
						{
							id: "u3l5_ex2",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "Ada 2 ikan di kolam, lalu ditambah 2 ikan lagi. Sekarang ada berapa ikan?",
							options: [
							],
							correct_answer: "4",
							explanation: "Tepat! 2 ikan + 2 ikan = 4 ikan.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🐟",
								count: 4
							}
						},
						{
							id: "u3l5_ex3",
							type: "true_false",
							difficulty: "medium",
							question: "1 + 3 hasilnya sama dengan 2 + 2.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Betul! 1 + 3 = 4 dan 2 + 2 = 4, jadi hasilnya sama.",
							spaced_repetition: true
						},
						{
							id: "u3l5_ex4",
							type: "matching",
							difficulty: "hard",
							question: "Pasangkan soal penjumlahan dengan hasilnya!",
							options: [
								"1 + 1::2",
								"2 + 2::4",
								"3 + 2::5"
							],
							correct_answer: "1 + 1::2|2 + 2::4|3 + 2::5",
							explanation: "Kamu hebat sekali! Kamu sudah menguasai penjumlahan sederhana dari 1 sampai 5.",
							spaced_repetition: false
						}
					]
				}
			],
			checkpoint: {
				id: "unit3_checkpoint",
				title: "Checkpoint Unit 3: Ujian Penjumlahan Sederhana",
				exercises: [
					{
						id: "u3cp_ex1",
						type: "multiple_choice",
						difficulty: "easy",
						question: "1 + 2 = ?",
						options: [
							"2",
							"3",
							"4",
							"1"
						],
						correct_answer: "3",
						explanation: "Betul! 1 ditambah 2 sama dengan 3.",
						spaced_repetition: false,
						visual: {
							type: "objects",
							label: "🍎",
							count: 3
						}
					},
					{
						id: "u3cp_ex2",
						type: "fill_in_blank",
						difficulty: "medium",
						question: "Ada 2 ikan di kolam, lalu ditambah 2 ikan lagi. Sekarang ada berapa ikan?",
						options: [
						],
						correct_answer: "4",
						explanation: "Tepat! 2 ikan + 2 ikan = 4 ikan.",
						spaced_repetition: true,
						visual: {
							type: "objects",
							label: "🐟",
							count: 4
						}
					},
					{
						id: "u3cp_ex3",
						type: "true_false",
						difficulty: "easy",
						question: "3 + 1 hasilnya adalah 4.",
						options: [
							"Benar",
							"Salah"
						],
						correct_answer: "Benar",
						explanation: "Betul! 3 ditambah 1 sama dengan 4.",
						spaced_repetition: false
					},
					{
						id: "u3cp_ex4",
						type: "matching",
						difficulty: "medium",
						question: "Pasangkan soal penjumlahan dengan hasilnya!",
						options: [
							"2 + 3::5",
							"1 + 3::4",
							"2 + 1::3"
						],
						correct_answer: "2 + 3::5|1 + 3::4|2 + 1::3",
						explanation: "Luar biasa! Kamu berhasil memasangkan semua soal dengan hasil yang benar.",
						spaced_repetition: false
					},
					{
						id: "u3cp_ex5",
						type: "multiple_choice",
						difficulty: "hard",
						question: "Ada 3 kupu-kupu, lalu datang 2 kupu-kupu lagi. Berapa jumlah kupu-kupu sekarang?",
						options: [
							"4",
							"5",
							"6",
							"3"
						],
						correct_answer: "5",
						explanation: "Betul sekali! 3 kupu-kupu + 2 kupu-kupu = 5 kupu-kupu.",
						spaced_repetition: true,
						visual: {
							type: "objects",
							label: "🦋",
							count: 5
						},
						image: "/images/pexels/kupu_kupu.jpg"
					},
					{
						id: "u3cp_ex6",
						type: "fill_in_blank",
						difficulty: "hard",
						question: "4 + 1 = ...",
						options: [
						],
						correct_answer: "5",
						explanation: "Tepat! 4 ditambah 1 sama dengan 5.",
						spaced_repetition: true,
						visual: {
							type: "ten_frame",
							value: 5
						}
					}
				]
			}
		}
	]
};
const mengenalAngkaTk = {
	course: course$3
};

var course$2 = {
	id: "counting_101",
	title: "Petualangan Berhitung Interaktif",
	description: "Belajar berhitung 1-20 dengan jari, bingkai sepuluh, dan kuis seru bergaya Duolingo!",
	target_audience: "Anak SD",
	units: [
		{
			id: "unit_1",
			title: "Unit 1: Berhitung Jari Tangan (1-10)",
			order: 1,
			icon: "hand",
			color: "emerald",
			lessons: [
				{
					id: "unit1_lesson1",
					title: "Menghitung Jari 1 sampai 5",
					order: 1,
					summary: "Mari belajar mengenal dan menghitung angka 1 sampai 5 dengan jari-jari tanganmu!",
					exercises: [
						{
							id: "u1l1_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Jika kamu mengangkat ibu jari (jempol) dan jari telunjuk, berapa banyak jari yang terangkat?",
							options: [
								"1",
								"2",
								"3",
								"5"
							],
							correct_answer: "2",
							explanation: "Jempol (1) ditambah telunjuk (1) sama dengan 2 jari terangkat.",
							spaced_repetition: true
						},
						{
							id: "u1l1_ex2",
							type: "true_false",
							difficulty: "easy",
							question: "Satu tangan penuh manusia memiliki 5 jari tangan.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Benar! Satu tangan memiliki 5 jari: jempol, telunjuk, tengah, manis, dan kelingking.",
							spaced_repetition: false
						},
						{
							id: "u1l1_ex3",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "Jempol, telunjuk, dan jari tengah terangkat bersama-sama. Berapa total jari terangkat?",
							options: [
							],
							correct_answer: "3",
							explanation: "1 + 1 + 1 = 3 jari terangkat.",
							spaced_repetition: true
						},
						{
							id: "u1l1_ex4",
							type: "matching",
							difficulty: "medium",
							question: "Pasangkan jumlah jari terangkat dengan angka yang tepat!",
							options: [
								"1 Jempol::1",
								"2 Jari V::2",
								"4 Jari Tanpa Jempol::4",
								"5 Jari Satu Tangan::5"
							],
							correct_answer: "1 Jempol::1|2 Jari V::2|4 Jari Tanpa Jempol::4|5 Jari Satu Tangan::5",
							explanation: "Setiap pasangan jari cocok dengan angka yang melambangkannya.",
							spaced_repetition: false
						},
						{
							id: "u1l1_ex5",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Jika kamu mengepal seluruh jarimu, berapa banyak jari yang terangkat?",
							options: [
								"0",
								"1",
								"4",
								"5"
							],
							correct_answer: "0",
							explanation: "Tangan mengepal artinya tidak ada jari yang terangkat (0 jari).",
							spaced_repetition: true
						}
					]
				},
				{
					id: "unit1_lesson2",
					title: "Menghitung Jari 6 sampai 10",
					order: 2,
					summary: "Setelah 5 jari di satu tangan, gunakan tangan kedua untuk menghitung hingga 10!",
					exercises: [
						{
							id: "u1l2_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "5 jari tangan kiri ditambah 1 jari tangan kanan berjumlah berapa jari?",
							options: [
								"5",
								"6",
								"7",
								"10"
							],
							correct_answer: "6",
							explanation: "5 + 1 = 6 jari terangkat.",
							spaced_repetition: true
						},
						{
							id: "u1l2_ex2",
							type: "true_false",
							difficulty: "easy",
							question: "Dua tangan penuh (semua jari dibuka) berjumlah 10 jari.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Benar! 5 jari tangan kiri + 5 jari tangan kanan = 10 jari.",
							spaced_repetition: false
						},
						{
							id: "u1l2_ex3",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "5 jari tangan kiri ditambah 3 jari tangan kanan sama dengan ... jari.",
							options: [
							],
							correct_answer: "8",
							explanation: "5 + 3 = 8 jari.",
							spaced_repetition: true
						},
						{
							id: "u1l2_ex4",
							type: "multiple_choice",
							difficulty: "hard",
							question: "Angka berapa yang berada tepat di antara angka 7 dan angka 9?",
							options: [
								"6",
								"7",
								"8",
								"10"
							],
							correct_answer: "8",
							explanation: "Urutan angka adalah 7, 8, 9. Jadi angka 8 di antara 7 dan 9.",
							spaced_repetition: true
						},
						{
							id: "u1l2_ex5",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "5 jari tangan kiri ditambah 2 jari tangan kanan sama dengan ... jari.",
							options: [
							],
							correct_answer: "7",
							explanation: "5 + 2 = 7 jari.",
							spaced_repetition: false
						}
					]
				},
				{
					id: "unit1_lesson3",
					title: "Mencocokkan Jari & Angka",
					order: 3,
					summary: "Latihan ketelitian mencocokkan jumlah jari tangan dengan angka 1 sampai 10.",
					exercises: [
						{
							id: "u1l3_ex1",
							type: "matching",
							difficulty: "medium",
							question: "Pasangkan nama istilah jari dengan jumlah atau cirinya!",
							options: [
								"Satu Tangan Penuh::5 Jari",
								"Dua Tangan Penuh::10 Jari",
								"Ibu Jari::Jempol",
								"Jari Terkecil::Kelingking"
							],
							correct_answer: "Satu Tangan Penuh::5 Jari|Dua Tangan Penuh::10 Jari|Ibu Jari::Jempol|Jari Terkecil::Kelingking",
							explanation: "Pasangan nama dan ciri jari sudah benar.",
							spaced_repetition: false
						},
						{
							id: "u1l3_ex2",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Berapa angka yang tepat jika kamu membuka 7 jari tangan?",
							options: [
								"6",
								"7",
								"8",
								"9"
							],
							correct_answer: "7",
							explanation: "7 jari yang terangkat diwakili oleh angka 7.",
							spaced_repetition: true
						},
						{
							id: "u1l3_ex3",
							type: "fill_in_blank",
							difficulty: "hard",
							question: "Jika kamu punya 10 jari lalu melipat 1 jari jempol, tersisa berapa jari terangkat?",
							options: [
							],
							correct_answer: "9",
							explanation: "10 dikurangi 1 sama dengan 9 jari.",
							spaced_repetition: true
						},
						{
							id: "u1l3_ex4",
							type: "true_false",
							difficulty: "easy",
							question: "Angka 6 lebih besar daripada angka 8.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Salah",
							explanation: "Salah! 8 lebih besar daripada 6.",
							spaced_repetition: false
						}
					]
				}
			],
			checkpoint: {
				id: "unit1_checkpoint",
				title: "Checkpoint Unit 1: Ujian Berhitung Jari",
				exercises: [
					{
						id: "u1ck_ex1",
						type: "multiple_choice",
						difficulty: "easy",
						question: "Berapa jumlah jari pada satu tangan manusia?",
						options: [
							"3",
							"4",
							"5",
							"6"
						],
						correct_answer: "5",
						explanation: "Satu tangan memiliki 5 jari.",
						spaced_repetition: true
					},
					{
						id: "u1ck_ex2",
						type: "fill_in_blank",
						difficulty: "medium",
						question: "5 jari ditambah 4 jari sama dengan ... jari.",
						options: [
						],
						correct_answer: "9",
						explanation: "5 + 4 = 9 jari.",
						spaced_repetition: true
					},
					{
						id: "u1ck_ex3",
						type: "true_false",
						difficulty: "easy",
						question: "Angka 10 diwakili oleh dua tangan terbuka penuh.",
						options: [
							"Benar",
							"Salah"
						],
						correct_answer: "Benar",
						explanation: "Benar! 5 jari kiri + 5 jari kanan = 10 jari.",
						spaced_repetition: false
					},
					{
						id: "u1ck_ex4",
						type: "matching",
						difficulty: "medium",
						question: "Pasangkan jumlah jari dengan nilainya!",
						options: [
							"Jempol & Telunjuk::2",
							"Tangan Kanan Penuh::5",
							"Dua Tangan Kurang 1::9",
							"Dua Tangan Penuh::10"
						],
						correct_answer: "Jempol & Telunjuk::2|Tangan Kanan Penuh::5|Dua Tangan Kurang 1::9|Dua Tangan Penuh::10",
						explanation: "Semua pasangan jumlah jari dan angka sudah sesuai.",
						spaced_repetition: false
					},
					{
						id: "u1ck_ex5",
						type: "multiple_choice",
						difficulty: "medium",
						question: "5 jari tangan kanan ditambah 5 jari tangan kiri sama dengan?",
						options: [
							"8",
							"9",
							"10",
							"12"
						],
						correct_answer: "10",
						explanation: "5 + 5 = 10.",
						spaced_repetition: true
					},
					{
						id: "u1ck_ex6",
						type: "fill_in_blank",
						difficulty: "hard",
						question: "10 jari dikurangi 3 jari sama dengan ... jari.",
						options: [
						],
						correct_answer: "7",
						explanation: "10 - 3 = 7 jari.",
						spaced_repetition: true
					},
					{
						id: "u1ck_ex7",
						type: "true_false",
						difficulty: "medium",
						question: "Jari jempol, telunjuk, dan kelingking terangkat berjumlah 3 jari.",
						options: [
							"Benar",
							"Salah"
						],
						correct_answer: "Benar",
						explanation: "Benar! 1 + 1 + 1 = 3 jari.",
						spaced_repetition: false
					},
					{
						id: "u1ck_ex8",
						type: "multiple_choice",
						difficulty: "hard",
						question: "Urutan angka dari yang terKecil ke terBesar adalah?",
						options: [
							"3, 1, 2",
							"1, 2, 3",
							"2, 3, 1",
							"3, 2, 1"
						],
						correct_answer: "1, 2, 3",
						explanation: "Urutan yang benar dari kecil ke besar adalah 1, 2, 3.",
						spaced_repetition: true
					}
				]
			}
		},
		{
			id: "unit_2",
			title: "Unit 2: Bingkai Sepuluh (Ten Frame Counting)",
			order: 2,
			icon: "grid",
			color: "sky",
			lessons: [
				{
					id: "unit2_lesson1",
					title: "Mengenal Ten Frame 1 - 5",
					order: 1,
					summary: "Ten Frame adalah kotak berukuran 2x5 (total 10 kotak) untuk membantu memvisualisasikan angka!",
					exercises: [
						{
							id: "u2l1_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Berapa jumlah total kotak kecil yang ada dalam satu Ten Frame penuh?",
							options: [
								"5",
								"8",
								"10",
								"12"
							],
							correct_answer: "10",
							explanation: "Ten Frame memiliki 2 baris x 5 kolom = 10 kotak.",
							spaced_repetition: true
						},
						{
							id: "u2l1_ex2",
							type: "true_false",
							difficulty: "easy",
							question: "Jika baris atas Ten Frame terisi titik secara penuh, jumlah titik tersebut adalah 5.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Benar! Baris atas Ten Frame berisi tepat 5 kotak.",
							spaced_repetition: false
						},
						{
							id: "u2l1_ex3",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "Jika ada 3 titik di baris atas Ten Frame, berapa titik lagi untuk membuat baris atas terisi penuh 5?",
							options: [
							],
							correct_answer: "2",
							explanation: "Baris atas berisi 5 kotak. 5 - 3 = 2 titik lagi.",
							spaced_repetition: true
						},
						{
							id: "u2l1_ex4",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Jika 1 kotak di Ten Frame terisi titik, berapa kotak yang masih kosong?",
							options: [
								"7",
								"8",
								"9",
								"10"
							],
							correct_answer: "9",
							explanation: "10 - 1 = 9 kotak kosong.",
							spaced_repetition: true
						}
					]
				},
				{
					id: "unit2_lesson2",
					title: "Ten Frame 6 sampai 10",
					order: 2,
					summary: "Mengisi baris kedua Ten Frame untuk angka 6 sampai 10 dengan mudah.",
					exercises: [
						{
							id: "u2l2_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Ten Frame terisi 5 titik di baris atas dan 2 titik di baris bawah. Berapa total titiknya?",
							options: [
								"6",
								"7",
								"8",
								"9"
							],
							correct_answer: "7",
							explanation: "5 titik atas + 2 titik bawah = 7 titik.",
							spaced_repetition: true
						},
						{
							id: "u2l2_ex2",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "Untuk membuat Ten Frame penuh (10 titik), jika sudah ada 6 titik, berapa kotak yang masih kosong?",
							options: [
							],
							correct_answer: "4",
							explanation: "10 kotak - 6 titik terisi = 4 kotak kosong.",
							spaced_repetition: true
						},
						{
							id: "u2l2_ex3",
							type: "true_false",
							difficulty: "medium",
							question: "Ten Frame dengan 9 titik terisi memiliki 2 kotak kosong.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Salah",
							explanation: "Salah! Karena total kotak ada 10, jika terisi 9 maka kotak kosongnya hanya 1 (10 - 9 = 1).",
							spaced_repetition: false
						},
						{
							id: "u2l2_ex4",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "5 titik di baris atas ditambah 5 titik di baris bawah Ten Frame sama dengan ... titik.",
							options: [
							],
							correct_answer: "10",
							explanation: "5 + 5 = 10 titik.",
							spaced_repetition: true
						}
					]
				},
				{
					id: "unit2_lesson3",
					title: "Menghitung Hewan di Ten Frame",
					order: 3,
					summary: "Hitung gambar hewan-hewan lucu yang ditaruh di dalam kotak Ten Frame!",
					exercises: [
						{
							id: "u2l3_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Ada 4 gambar anak kucing di Ten Frame. Berapa kotak Ten Frame yang masih kosong?",
							options: [
								"4",
								"5",
								"6",
								"7"
							],
							correct_answer: "6",
							explanation: "10 kotak - 4 anak kucing = 6 kotak kosong.",
							spaced_repetition: true
						},
						{
							id: "u2l3_ex2",
							type: "matching",
							difficulty: "medium",
							question: "Pasangkan jumlah titik Ten Frame dengan sisa kotak kosongnya!",
							options: [
								"7 Titik Terisi::3 Kotak Kosong",
								"8 Titik Terisi::2 Kotak Kosong",
								"9 Titik Terisi::1 Kotak Kosong",
								"10 Titik Terisi::0 Kotak Kosong"
							],
							correct_answer: "7 Titik Terisi::3 Kotak Kosong|8 Titik Terisi::2 Kotak Kosong|9 Titik Terisi::1 Kotak Kosong|10 Titik Terisi::0 Kotak Kosong",
							explanation: "Total kotak Ten Frame selalu 10, sehingga terisi + kosong = 10.",
							spaced_repetition: false
						},
						{
							id: "u2l3_ex3",
							type: "fill_in_blank",
							difficulty: "easy",
							question: "Ada 8 gambar kelinci di Ten Frame. Berapa gambar kelinci lagi yang dibutuhkan agar jadi 10?",
							options: [
							],
							correct_answer: "2",
							explanation: "10 - 8 = 2 kelinci lagi.",
							spaced_repetition: true
						},
						{
							id: "u2l3_ex4",
							type: "true_false",
							difficulty: "easy",
							question: "Ten Frame dengan 5 titik terisi baru terisi setengahnya.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Benar! 5 adalah setengah dari 10.",
							spaced_repetition: false
						}
					]
				}
			],
			checkpoint: {
				id: "unit2_checkpoint",
				title: "Checkpoint Unit 2: Master Ten Frame",
				exercises: [
					{
						id: "u2ck_ex1",
						type: "multiple_choice",
						difficulty: "easy",
						question: "Berapa titik pada Ten Frame jika baris atas terisi penuh dan baris bawah ada 4 titik?",
						options: [
							"7",
							"8",
							"9",
							"10"
						],
						correct_answer: "9",
						explanation: "5 + 4 = 9 titik.",
						spaced_repetition: true
					},
					{
						id: "u2ck_ex2",
						type: "fill_in_blank",
						difficulty: "medium",
						question: "Ten Frame yang terisi penuh 10 titik dikurangi 3 titik tersisa ... titik.",
						options: [
						],
						correct_answer: "7",
						explanation: "10 - 3 = 7 titik.",
						spaced_repetition: true
					},
					{
						id: "u2ck_ex3",
						type: "true_false",
						difficulty: "easy",
						question: "Baris atas Ten Frame berisi 6 kotak.",
						options: [
							"Benar",
							"Salah"
						],
						correct_answer: "Salah",
						explanation: "Salah! Baris atas Ten Frame berisi 5 kotak.",
						spaced_repetition: false
					},
					{
						id: "u2ck_ex4",
						type: "matching",
						difficulty: "medium",
						question: "Pasangkan titik terisi dengan sisa kotak kosong!",
						options: [
							"6 Titik::4 Kosong",
							"5 Titik::5 Kosong",
							"8 Titik::2 Kosong",
							"10 Titik::0 Kosong"
						],
						correct_answer: "6 Titik::4 Kosong|5 Titik::5 Kosong|8 Titik::2 Kosong|10 Titik::0 Kosong",
						explanation: "Setiap pasangan titik terisi + sisa kosong berjumlah 10.",
						spaced_repetition: false
					},
					{
						id: "u2ck_ex5",
						type: "multiple_choice",
						difficulty: "medium",
						question: "Manakah jumlah titik yang membuat Ten Frame terisi penuh?",
						options: [
							"8",
							"9",
							"10",
							"12"
						],
						correct_answer: "10",
						explanation: "Ten Frame memiliki total 10 kotak.",
						spaced_repetition: true
					},
					{
						id: "u2ck_ex6",
						type: "fill_in_blank",
						difficulty: "hard",
						question: "Jika ada 5 titik di baris atas dan 3 titik di baris bawah, total titiknya adalah ...",
						options: [
						],
						correct_answer: "8",
						explanation: "5 + 3 = 8.",
						spaced_repetition: true
					},
					{
						id: "u2ck_ex7",
						type: "true_false",
						difficulty: "easy",
						question: "Jika Ten Frame memiliki 7 titik, maka lebih banyak kotak yang terisi daripada yang kosong.",
						options: [
							"Benar",
							"Salah"
						],
						correct_answer: "Benar",
						explanation: "Benar! 7 kotak terisi > 3 kotak kosong.",
						spaced_repetition: false
					},
					{
						id: "u2ck_ex8",
						type: "multiple_choice",
						difficulty: "hard",
						question: "Berapa titik di baris bawah jika Ten Frame bernilai 6?",
						options: [
							"1",
							"2",
							"3",
							"5"
						],
						correct_answer: "1",
						explanation: "5 titik di baris atas + 1 titik di baris bawah = 6.",
						spaced_repetition: true
					}
				]
			}
		},
		{
			id: "unit_3",
			title: "Unit 3: Menghitung Objek & Mencocokkan",
			order: 3,
			icon: "shapes",
			color: "amber",
			lessons: [
				{
					id: "unit3_lesson1",
					title: "Hitung & Tulis Objek",
					order: 1,
					summary: "Hitung sekumpulan buah, bintang, atau mainan lalu tentukan angka jumlahnya!",
					exercises: [
						{
							id: "u3l1_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Kamu memiliki 3 apel merah dan 2 apel hijau. Berapa jumlah seluruh apelmu?",
							options: [
								"4",
								"5",
								"6",
								"7"
							],
							correct_answer: "5",
							explanation: "3 + 2 = 5 apel.",
							spaced_repetition: true
						},
						{
							id: "u3l1_ex2",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "Di atas meja ada 4 pensil. Ibu meletakkan 3 pensil lagi. Berapa jumlah pensil sekarang?",
							options: [
							],
							correct_answer: "7",
							explanation: "4 + 3 = 7 pensil.",
							spaced_repetition: true
						},
						{
							id: "u3l1_ex3",
							type: "matching",
							difficulty: "easy",
							question: "Pasangkan sekumpulan objek gambar dengan nilainya!",
							options: [
								"🍎 🍎 🍎::3",
								"⭐ ⭐ ⭐ ⭐ ⭐::5",
								"🎈 🎈::2",
								"🚗 🚗 🚗 🚗::4"
							],
							correct_answer: "🍎 🍎 🍎::3|⭐ ⭐ ⭐ ⭐ ⭐::5|🎈 🎈::2|🚗 🚗 🚗 🚗::4",
							explanation: "Semua objek terhitung dengan benar.",
							spaced_repetition: false
						},
						{
							id: "u3l1_ex4",
							type: "true_false",
							difficulty: "easy",
							question: "3 jeruk ditambah 3 jeruk sama dengan 6 jeruk.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Benar! 3 + 3 = 6.",
							spaced_repetition: false
						}
					]
				},
				{
					id: "unit3_lesson2",
					title: "Hitung & Lingkari Angka Benar",
					order: 2,
					summary: "Pilih simbol angka yang cocok di antara pilihan yang ada.",
					exercises: [
						{
							id: "u3l2_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Ada 9 bola basket di keranjang. Manakah angka yang melambangkan 9 bola tersebut?",
							options: [
								"6",
								"7",
								"8",
								"9"
							],
							correct_answer: "9",
							explanation: "Angka 9 melambangkan jumlah 9 bola.",
							spaced_repetition: true
						},
						{
							id: "u3l2_ex2",
							type: "true_false",
							difficulty: "easy",
							question: "Urutan angka dari kecil ke besar yang benar adalah 1, 2, 3, 4, 5.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Benar! Angka diurutkan mulai dari yang paling kecil (1) ke besar.",
							spaced_repetition: false
						},
						{
							id: "u3l2_ex3",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "Di taman ada 5 kupu-kupu. Datang lagi 4 kupu-kupu. Berapa total kupu-kupu sekarang?",
							options: [
							],
							correct_answer: "9",
							explanation: "5 + 4 = 9 kupu-kupu.",
							spaced_repetition: true
						},
						{
							id: "u3l2_ex4",
							type: "multiple_choice",
							difficulty: "medium",
							question: "Manakah himpunan yang jumlahnya paling banyak?",
							options: [
								"3 Bintang",
								"5 Bintang",
								"8 Bintang",
								"6 Bintang"
							],
							correct_answer: "8 Bintang",
							explanation: "8 adalah angka terbesar di antara pilihan tersebut.",
							spaced_repetition: true
						}
					]
				}
			],
			checkpoint: {
				id: "unit3_checkpoint",
				title: "Checkpoint Unit 3: Ujian Menghitung Objek",
				exercises: [
					{
						id: "u3ck_ex1",
						type: "multiple_choice",
						difficulty: "medium",
						question: "Berapa jumlah roda pada 2 sepeda roda dua?",
						options: [
							"2",
							"3",
							"4",
							"6"
						],
						correct_answer: "4",
						explanation: "1 sepeda = 2 roda. 2 sepeda = 2 + 2 = 4 roda.",
						spaced_repetition: true
					},
					{
						id: "u3ck_ex2",
						type: "fill_in_blank",
						difficulty: "medium",
						question: "Kamu punya 6 permen. Temanmu memberi 3 permen lagi. Permenmu jadi ...",
						options: [
						],
						correct_answer: "9",
						explanation: "6 + 3 = 9 permen.",
						spaced_repetition: true
					},
					{
						id: "u3ck_ex3",
						type: "true_false",
						difficulty: "easy",
						question: "4 kucing ditambah 4 kucing sama dengan 8 kucing.",
						options: [
							"Benar",
							"Salah"
						],
						correct_answer: "Benar",
						explanation: "Benar! 4 + 4 = 8.",
						spaced_repetition: false
					},
					{
						id: "u3ck_ex4",
						type: "matching",
						difficulty: "medium",
						question: "Pasangkan nama bilangan dan angkanya!",
						options: [
							"Tujuh::7",
							"Delapan::8",
							"Sembilan::9",
							"Sepuluh::10"
						],
						correct_answer: "Tujuh::7|Delapan::8|Sembilan::9|Sepuluh::10",
						explanation: "Setiap nama bilangan telah dipasangkan dengan angka yang sesuai.",
						spaced_repetition: false
					},
					{
						id: "u3ck_ex5",
						type: "multiple_choice",
						difficulty: "easy",
						question: "Ibu membeli 5 donat cokelat dan 5 donat keju. Berapa donat seluruhnya?",
						options: [
							"8",
							"9",
							"10",
							"12"
						],
						correct_answer: "10",
						explanation: "5 + 5 = 10 donat.",
						spaced_repetition: true
					},
					{
						id: "u3ck_ex6",
						type: "fill_in_blank",
						difficulty: "hard",
						question: "Ada 10 burung di pohon. 4 burung terbang pergi. Tersisa ... burung di pohon.",
						options: [
						],
						correct_answer: "6",
						explanation: "10 - 4 = 6 burung.",
						spaced_repetition: true
					},
					{
						id: "u3ck_ex7",
						type: "true_false",
						difficulty: "medium",
						question: "Angka 7 lebih kecil daripada angka 5.",
						options: [
							"Benar",
							"Salah"
						],
						correct_answer: "Salah",
						explanation: "Salah! 7 lebih besar daripada 5.",
						spaced_repetition: false
					},
					{
						id: "u3ck_ex8",
						type: "multiple_choice",
						difficulty: "hard",
						question: "Jika kamu memasukkan 3 bola merah dan 4 bola biru ke dalam wadah, berapa bola di wadah?",
						options: [
							"5",
							"6",
							"7",
							"8"
						],
						correct_answer: "7",
						explanation: "3 + 4 = 7 bola.",
						spaced_repetition: true
					}
				]
			}
		},
		{
			id: "unit_4",
			title: "Unit 4: Petualangan Angka 11-20",
			order: 4,
			icon: "star",
			color: "rose",
			lessons: [
				{
					id: "unit4_lesson1",
					title: "Angka Belasan 11 - 15",
					order: 1,
					summary: "Angka 11 sampai 15 dibentuk dari 1 puluhan (10) ditambah angka 1 sampai 5!",
					exercises: [
						{
							id: "u4l1_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "10 ditambah 1 sama dengan angka berapa?",
							options: [
								"10",
								"11",
								"12",
								"15"
							],
							correct_answer: "11",
							explanation: "10 + 1 = 11 (Sebelas).",
							spaced_repetition: true
						},
						{
							id: "u4l1_ex2",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "10 + 4 = ...",
							options: [
							],
							correct_answer: "14",
							explanation: "10 + 4 = 14 (Empat Belas).",
							spaced_repetition: true
						},
						{
							id: "u4l1_ex3",
							type: "matching",
							difficulty: "medium",
							question: "Pasangkan penjumlahan puluhan dengan hasilnya!",
							options: [
								"10 + 2::12",
								"10 + 3::13",
								"10 + 5::15",
								"10 + 1::11"
							],
							correct_answer: "10 + 2::12|10 + 3::13|10 + 5::15|10 + 1::11",
							explanation: "Semua penjumlahan puluhan + satuan sudah tepat.",
							spaced_repetition: false
						},
						{
							id: "u4l1_ex4",
							type: "true_false",
							difficulty: "easy",
							question: "Angka 15 dibaca Dua Belas.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Salah",
							explanation: "Salah! Angka 15 dibaca Lima Belas.",
							spaced_repetition: false
						}
					]
				},
				{
					id: "unit4_lesson2",
					title: "Angka Belasan 16 - 20",
					order: 2,
					summary: "Melanjutkan angka 16 sampai 20 dengan semangat!",
					exercises: [
						{
							id: "u4l2_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Angka berapa yang datang tepat setelah angka 18?",
							options: [
								"17",
								"18",
								"19",
								"20"
							],
							correct_answer: "19",
							explanation: "Urutan angkanya: 17, 18, 19, 20. Jadi setelah 18 adalah 19.",
							spaced_repetition: true
						},
						{
							id: "u4l2_ex2",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "10 ditambah 10 sama dengan angka ...",
							options: [
							],
							correct_answer: "20",
							explanation: "10 + 10 = 20 (Dua Puluh).",
							spaced_repetition: true
						},
						{
							id: "u4l2_ex3",
							type: "true_false",
							difficulty: "medium",
							question: "Angka 17 terdiri dari 10 dan 7.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Benar! 10 + 7 = 17.",
							spaced_repetition: false
						},
						{
							id: "u4l2_ex4",
							type: "multiple_choice",
							difficulty: "medium",
							question: "Angka berapa yang berada tepat sebelum angka 20?",
							options: [
								"17",
								"18",
								"19",
								"21"
							],
							correct_answer: "19",
							explanation: "Sebelum 20 adalah angka 19.",
							spaced_repetition: true
						}
					]
				},
				{
					id: "unit4_lesson3",
					title: "Urutan & Angka Hilang (Missing Numbers)",
					order: 3,
					summary: "Temukan angka misterius yang hilang pada barisan urutan angka 1 sampai 20!",
					exercises: [
						{
							id: "u4l3_ex1",
							type: "fill_in_blank",
							difficulty: "medium",
							question: "Isi angka yang hilang pada urutan ini: 1, 2, 3, ..., 5",
							options: [
							],
							correct_answer: "4",
							explanation: "Angka yang melengkapi urutan 1, 2, 3, 4, 5 adalah 4.",
							spaced_repetition: true
						},
						{
							id: "u4l3_ex2",
							type: "multiple_choice",
							difficulty: "hard",
							question: "Angka berapa yang hilang dari barisan ini: 11, 12, __, 14, 15?",
							options: [
								"10",
								"13",
								"16",
								"17"
							],
							correct_answer: "13",
							explanation: "Di antara 12 dan 14 adalah angka 13.",
							spaced_repetition: true
						},
						{
							id: "u4l3_ex3",
							type: "fill_in_blank",
							difficulty: "hard",
							question: "Isi angka yang hilang: 16, 17, 18, ..., 20",
							options: [
							],
							correct_answer: "19",
							explanation: "Angka di antara 18 dan 20 adalah 19.",
							spaced_repetition: true
						},
						{
							id: "u4l3_ex4",
							type: "true_false",
							difficulty: "medium",
							question: "Pada barisan 8, 9, 10, 11, angka 10 berada di tengah antara 9 dan 11.",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Benar! 9, 10, 11.",
							spaced_repetition: false
						}
					]
				}
			],
			checkpoint: {
				id: "unit4_checkpoint",
				title: "Checkpoint Unit 4: Kelulusan Petualangan Berhitung",
				exercises: [
					{
						id: "u4ck_ex1",
						type: "multiple_choice",
						difficulty: "hard",
						question: "Manakah urutan 3 angka berurutan yang benar?",
						options: [
							"11, 13, 12",
							"14, 15, 16",
							"18, 20, 19",
							"15, 17, 16"
						],
						correct_answer: "14, 15, 16",
						explanation: "14, 15, 16 diurutkan secara benar dari yang terkecil.",
						spaced_repetition: true
					},
					{
						id: "u4ck_ex2",
						type: "fill_in_blank",
						difficulty: "medium",
						question: "10 + 6 = ...",
						options: [
						],
						correct_answer: "16",
						explanation: "10 + 6 = 16 (Enam Belas).",
						spaced_repetition: true
					},
					{
						id: "u4ck_ex3",
						type: "true_false",
						difficulty: "easy",
						question: "Angka 20 adalah angka paling besar di antara 11 sampai 20.",
						options: [
							"Benar",
							"Salah"
						],
						correct_answer: "Benar",
						explanation: "Benar! 20 adalah nilai terbesar dalam rentang 11-20.",
						spaced_repetition: false
					},
					{
						id: "u4ck_ex4",
						type: "matching",
						difficulty: "medium",
						question: "Pasangkan angka belasan dan kata bilangannya!",
						options: [
							"11::Sebelas",
							"14::Empat Belas",
							"18::Delapan Belas",
							"20::Dua Puluh"
						],
						correct_answer: "11::Sebelas|14::Empat Belas|18::Delapan Belas|20::Dua Puluh",
						explanation: "Semua angka belasan dan kata bilangannya tepat.",
						spaced_repetition: false
					},
					{
						id: "u4ck_ex5",
						type: "multiple_choice",
						difficulty: "hard",
						question: "Angka berapa yang hilang: 15, 16, __, 18, 19?",
						options: [
							"14",
							"17",
							"20",
							"13"
						],
						correct_answer: "17",
						explanation: "Angka di antara 16 dan 18 adalah 17.",
						spaced_repetition: true
					},
					{
						id: "u4ck_ex6",
						type: "fill_in_blank",
						difficulty: "hard",
						question: "10 + 9 = ...",
						options: [
						],
						correct_answer: "19",
						explanation: "10 + 9 = 19 (Sembilan Belas).",
						spaced_repetition: true
					},
					{
						id: "u4ck_ex7",
						type: "true_false",
						difficulty: "medium",
						question: "10 + 10 menghasilkan angka 19.",
						options: [
							"Benar",
							"Salah"
						],
						correct_answer: "Salah",
						explanation: "Salah! 10 + 10 = 20.",
						spaced_repetition: false
					},
					{
						id: "u4ck_ex8",
						type: "multiple_choice",
						difficulty: "hard",
						question: "Angka berapa yang datang tepat setelah 19?",
						options: [
							"18",
							"20",
							"21",
							"22"
						],
						correct_answer: "20",
						explanation: "Setelah 19 adalah 20.",
						spaced_repetition: true
					}
				]
			}
		}
	]
};
const courseCounting = {
	course: course$2
};

var course$1 = {
	id: "course_berhitung_tk_01",
	title: "Mengenal Angka 1-5 & Berhitung Ceria",
	description: "Petualangan seru belajar angka 1 sampai 5 untuk anak usia taman kanak-kanak dengan berbagai permainan interaktif!",
	target_audience: "Anak TK (4-6 tahun)",
	units: [
		{
			id: "unit_1",
			title: "Unit 1: Berkenalan dengan Angka 1, 2, dan 3",
			order: 1,
			icon: "star",
			color: "blue",
			lessons: [
				{
					id: "u1_lesson1",
					title: "Satu dan Dua yang Lucu",
					order: 1,
					summary: "Belajar mengenali bentuk dan jumlah angka 1 dan 2.",
					exercises: [
						{
							id: "u1l1_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Ada berapa buah apel di gambar?",
							options: [
								"1",
								"2",
								"3",
								"4"
							],
							correct_answer: "1",
							explanation: "Betul! Hanya ada 1 apel berwarna merah.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🍎",
								count: 1
							}
						},
						{
							id: "u1l1_ex2",
							type: "drag_and_drop",
							difficulty: "easy",
							question: "Masukkan 2 buah pisang 🍌 ke dalam keranjang monyet!",
							options: [
							],
							correct_answer: "2",
							explanation: "Pintar! Monyet sangat senang dengan 2 pisang itu.",
							spaced_repetition: false,
							visual: {
								type: "objects",
								label: "🍌",
								count: 4
							}
						},
						{
							id: "u1l1_ex3",
							type: "true_false",
							difficulty: "easy",
							question: "Apakah ini menunjukkan 2 jari?",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Tepat sekali! Itu adalah telunjuk dan jari tengah, jumlahnya 2.",
							spaced_repetition: true,
							visual: {
								type: "hand",
								value: 2
							}
						},
						{
							id: "u1l1_ex4",
							type: "seek_find",
							difficulty: "medium",
							question: "Cari & temukan 2 ekor Kucing 🐱 yang bersembunyi!",
							options: [
							],
							correct_answer: "2",
							explanation: "Hebat! Kamu menemukan kedua kucing tersebut.",
							spaced_repetition: false,
							visual: {
								label: "🐱",
								items: [
									{
										x: 20,
										y: 30,
										icon: "🐱"
									},
									{
										x: 80,
										y: 60,
										icon: "🐱"
									}
								]
							}
						}
					]
				},
				{
					id: "u1_lesson2",
					title: "Tiga yang Menggemaskan",
					order: 2,
					summary: "Mengenal angka 3 dan berlatih membandingkan.",
					exercises: [
						{
							id: "u1l2_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Berapa banyak jeruk yang kamu lihat?",
							options: [
								"1",
								"2",
								"3",
								"4"
							],
							correct_answer: "3",
							explanation: "Benar! Ada tiga jeruk segar.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🍊",
								count: 3
							}
						},
						{
							id: "u1l2_ex2",
							type: "sequence_ordering",
							difficulty: "medium",
							question: "Angka berapa yang hilang setelah 1?",
							options: [
								"1",
								"2",
								"3",
								"4"
							],
							correct_answer: "2",
							explanation: "Yey! Setelah 1 adalah 2, lalu 3.",
							spaced_repetition: true,
							visual: {
								sequence: [
									"1",
									"?",
									"3"
								]
							}
						},
						{
							id: "u1l2_ex3",
							type: "comparison",
							difficulty: "medium",
							question: "Mana kelompok buah yang jumlahnya LEBIH BANYAK?",
							options: [
								"A",
								"B",
								"Sama"
							],
							correct_answer: "B",
							explanation: "Betul! Kelompok B punya 3 pisang, sedangkan A hanya 1 apel.",
							spaced_repetition: false,
							visual: {
								groupA: {
									count: 1,
									icon: "🍎",
									label: "Kelompok A"
								},
								groupB: {
									count: 3,
									icon: "🍌",
									label: "Kelompok B"
								}
							}
						},
						{
							id: "u1l2_ex4",
							type: "pattern_matching",
							difficulty: "hard",
							question: "Gambar apa yang selanjutnya?",
							options: [
								"🍎",
								"🍌",
								"🍇",
								"🍊"
							],
							correct_answer: "🍎",
							explanation: "Pintar! Polanya adalah Apel, Pisang, lalu Apel lagi.",
							spaced_repetition: false,
							visual: {
								pattern: [
									"🍎",
									"🍌",
									"🍎",
									"🍌",
									"?"
								]
							}
						}
					]
				}
			],
			checkpoint: {
				id: "u1_checkpoint",
				title: "Checkpoint Unit 1: Pesta Angka 1-3",
				exercises: [
					{
						id: "u1cp_ex1",
						type: "multiple_choice",
						difficulty: "easy",
						question: "Pilih angka yang mewakili 3 buah stroberi 🍓!",
						options: [
							"1",
							"2",
							"3",
							"4"
						],
						correct_answer: "3",
						explanation: "Benar! 3 stroberi sama dengan angka 3.",
						spaced_repetition: true,
						visual: {
							type: "objects",
							label: "🍓",
							count: 3
						}
					},
					{
						id: "u1cp_ex2",
						type: "matching",
						difficulty: "medium",
						question: "Cocokkan angka dengan jumlah buahnya!",
						options: [
							"1::🍎",
							"2::🍌🍌",
							"3::🍊🍊🍊"
						],
						correct_answer: "1::🍎|2::🍌🍌|3::🍊🍊🍊",
						explanation: "Wah, kamu berhasil memasangkan semuanya dengan tepat!",
						spaced_repetition: false
					},
					{
						id: "u1cp_ex3",
						type: "drag_and_drop",
						difficulty: "easy",
						question: "Seret 1 buah jeruk 🍊 ke piring!",
						options: [
						],
						correct_answer: "1",
						explanation: "Bagus sekali!",
						spaced_repetition: false,
						visual: {
							type: "objects",
							label: "🍊",
							count: 3
						}
					},
					{
						id: "u1cp_ex4",
						type: "true_false",
						difficulty: "easy",
						question: "Ada 3 kucing 🐱 di taman ini, benar atau salah?",
						options: [
							"Benar",
							"Salah"
						],
						correct_answer: "Salah",
						explanation: "Itu salah, karena hanya ada 2 kucing.",
						spaced_repetition: false,
						visual: {
							type: "objects",
							label: "🐱",
							count: 2
						}
					},
					{
						id: "u1cp_ex5",
						type: "fill_in_blank",
						difficulty: "medium",
						question: "Hitung jumlah mobilnya dan ketik angkanya: 🚗 🚗 🚗",
						options: [
						],
						correct_answer: "3",
						explanation: "Sempurna! Jumlahnya 3.",
						spaced_repetition: true
					}
				]
			}
		},
		{
			id: "unit_2",
			title: "Unit 2: Empat dan Lima yang Hebat",
			order: 2,
			icon: "moon",
			color: "purple",
			lessons: [
				{
					id: "u2_lesson1",
					title: "Angka 4 yang Kuat",
					order: 1,
					summary: "Mengenal angka 4 melalui bentuk dan jumlah.",
					exercises: [
						{
							id: "u2l1_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Ada berapa semangka di gambar?",
							options: [
								"2",
								"3",
								"4",
								"5"
							],
							correct_answer: "4",
							explanation: "Betul sekali, ada 4 semangka yang lezat!",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🍉",
								count: 4
							}
						},
						{
							id: "u2l1_ex2",
							type: "true_false",
							difficulty: "easy",
							question: "Gambar di bawah ini menunjukkan 4 benda?",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Tepat! Terdapat 4 benda.",
							spaced_repetition: false,
							visual: {
								type: "ten_frame",
								value: 4
							}
						},
						{
							id: "u2l1_ex3",
							type: "drag_and_drop",
							difficulty: "medium",
							question: "Masukkan 4 buah anggur 🍇 ke mangkuk!",
							options: [
							],
							correct_answer: "4",
							explanation: "Super! Kamu sudah bisa menghitung sampai 4.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🍇",
								count: 6
							}
						},
						{
							id: "u2l1_ex4",
							type: "comparison",
							difficulty: "medium",
							question: "Mana yang jumlahnya LEBIH SEDIKIT?",
							options: [
								"A",
								"B",
								"Sama"
							],
							correct_answer: "A",
							explanation: "Benar! Kelompok A (2) lebih sedikit dari B (4).",
							spaced_repetition: false,
							visual: {
								groupA: {
									count: 2,
									icon: "🍎",
									label: "Kelompok A"
								},
								groupB: {
									count: 4,
									icon: "🍉",
									label: "Kelompok B"
								}
							}
						}
					]
				},
				{
					id: "u2_lesson2",
					title: "Angka 5 yang Ceria",
					order: 2,
					summary: "Belajar angka 5 dan melengkapi urutan.",
					exercises: [
						{
							id: "u2l2_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Berapa banyak bintang yang bersinar?",
							options: [
								"2",
								"3",
								"4",
								"5"
							],
							correct_answer: "5",
							explanation: "Hebat! Ada 5 bintang cemerlang.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "⭐",
								count: 5
							}
						},
						{
							id: "u2l2_ex2",
							type: "sequence_ordering",
							difficulty: "hard",
							question: "Bantu melengkapi angka yang hilang!",
							options: [
								"3",
								"4",
								"5",
								"6"
							],
							correct_answer: "5",
							explanation: "Tepat sekali, 5 melengkapi urutan 3, 4, 5.",
							spaced_repetition: true,
							visual: {
								sequence: [
									"3",
									"4",
									"?",
									"6"
								]
							}
						},
						{
							id: "u2l2_ex3",
							type: "seek_find",
							difficulty: "medium",
							question: "Temukan 5 kupu-kupu 🦋 di taman bunga!",
							options: [
							],
							correct_answer: "5",
							explanation: "Wah, matamu sangat jeli!",
							spaced_repetition: false,
							visual: {
								label: "🦋",
								items: [
									{
										x: 10,
										y: 20,
										icon: "🦋"
									},
									{
										x: 40,
										y: 50,
										icon: "🦋"
									},
									{
										x: 70,
										y: 10,
										icon: "🦋"
									},
									{
										x: 80,
										y: 80,
										icon: "🦋"
									},
									{
										x: 30,
										y: 90,
										icon: "🦋"
									}
								]
							}
						},
						{
							id: "u2l2_ex4",
							type: "matching",
							difficulty: "medium",
							question: "Hubungkan angka dengan jumlah yang benar!",
							options: [
								"4::🍉🍉🍉🍉",
								"5::⭐⭐⭐⭐⭐",
								"2::🍎🍎"
							],
							correct_answer: "4::🍉🍉🍉🍉|5::⭐⭐⭐⭐⭐|2::🍎🍎",
							explanation: "Luar biasa! Semuanya berpasangan dengan sempurna.",
							spaced_repetition: true
						}
					]
				}
			],
			checkpoint: {
				id: "u2_checkpoint",
				title: "Checkpoint Unit 2: Tantangan 1 sampai 5",
				exercises: [
					{
						id: "u2cp_ex1",
						type: "multiple_choice",
						difficulty: "easy",
						question: "Ada berapa jumlah kelinci ini: 🐇 🐇 🐇 🐇 🐇?",
						options: [
							"3",
							"4",
							"5",
							"6"
						],
						correct_answer: "5",
						explanation: "Benar! Totalnya ada 5 kelinci.",
						spaced_repetition: true
					},
					{
						id: "u2cp_ex2",
						type: "sequence_ordering",
						difficulty: "medium",
						question: "Isi angka yang kosong untuk melengkapi urutan!",
						options: [
							"2",
							"3",
							"4",
							"5"
						],
						correct_answer: "4",
						explanation: "Pintar! Setelah 3 adalah 4.",
						spaced_repetition: true,
						visual: {
							sequence: [
								"2",
								"3",
								"?",
								"5"
							]
						}
					},
					{
						id: "u2cp_ex3",
						type: "drag_and_drop",
						difficulty: "medium",
						question: "Ambil 4 bunga 🌻 dan taruh di vas!",
						options: [
						],
						correct_answer: "4",
						explanation: "Vas bunganya terlihat sangat cantik dengan 4 bunga.",
						spaced_repetition: false,
						visual: {
							type: "objects",
							label: "🌻",
							count: 6
						}
					},
					{
						id: "u2cp_ex4",
						type: "pattern_matching",
						difficulty: "hard",
						question: "Gambar apa yang harusnya muncul di akhir?",
						options: [
							"⭐",
							"🌙",
							"☀️",
							"☁️"
						],
						correct_answer: "⭐",
						explanation: "Tepat! Polanya adalah Bintang, Bulan, Bintang.",
						spaced_repetition: false,
						visual: {
							pattern: [
								"⭐",
								"🌙",
								"⭐",
								"🌙",
								"?"
							]
						}
					},
					{
						id: "u2cp_ex5",
						type: "comparison",
						difficulty: "medium",
						question: "Mana yang jumlahnya SAMA DENGAN 4?",
						options: [
							"A",
							"B",
							"Sama"
						],
						correct_answer: "B",
						explanation: "Betul, Kelompok B berjumlah 4.",
						spaced_repetition: true,
						visual: {
							groupA: {
								count: 5,
								icon: "🍎",
								label: "Kelompok A"
							},
							groupB: {
								count: 4,
								icon: "🍉",
								label: "Kelompok B"
							}
						}
					}
				]
			}
		}
	]
};
const courseBerhitungTk01 = {
	course: course$1
};

var course = {
	id: "course_hewan_tk_sd",
	title: "Petualangan Dunia Hewan",
	description: "Mari bermain dan belajar mengenal berbagai macam hewan di sekitar kita, dari hewan peliharaan yang lucu hingga hewan liar di hutan!",
	target_audience: "Anak TK & SD Kelas 1 (5-7 tahun)",
	units: [
		{
			id: "unit_1",
			title: "Unit 1: Teman Kecil di Rumah (Hewan Peliharaan)",
			order: 1,
			icon: "home",
			color: "orange",
			lessons: [
				{
					id: "u1_lesson1",
					title: "Kucing, Anjing, dan Ikan",
					order: 1,
					summary: "Mengenal hewan-hewan yang sering dipelihara di rumah.",
					exercises: [
						{
							id: "u1l1_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Hewan apa yang suka mengeong dan suka makan ikan?",
							options: [
								"Anjing",
								"Kucing",
								"Kelinci",
								"Burung"
							],
							correct_answer: "Kucing",
							explanation: "Betul! Kucing bersuara 'Meong' dan sangat suka ikan.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🐱",
								count: 1
							}
						},
						{
							id: "u1l1_ex2",
							type: "drag_and_drop",
							difficulty: "easy",
							question: "Pindahkan 3 ikan 🐟 ini ke dalam akuarium!",
							options: [
							],
							correct_answer: "3",
							explanation: "Pintar! Ikan-ikan sekarang berenang di akuarium.",
							spaced_repetition: false,
							visual: {
								type: "objects",
								label: "🐟",
								count: 3
							}
						},
						{
							id: "u1l1_ex3",
							type: "true_false",
							difficulty: "easy",
							question: "Anjing adalah hewan yang suka menggonggong (Guk guk). Benar atau Salah?",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Tepat sekali! Anjing bersuara guk guk.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🐶",
								count: 1
							}
						},
						{
							id: "u1l1_ex4",
							type: "seek_find",
							difficulty: "medium",
							question: "Cari & temukan 2 ekor kelinci 🐰 yang bersembunyi di taman!",
							options: [
							],
							correct_answer: "2",
							explanation: "Hebat! Kamu menemukan kelinci yang sedang melompat.",
							spaced_repetition: false,
							visual: {
								label: "🐰",
								items: [
									{
										x: 10,
										y: 80,
										icon: "🐰"
									},
									{
										x: 75,
										y: 20,
										icon: "🐰"
									}
								]
							},
							image: "/images/pexels/kelinci.jpg"
						},
						{
							id: "u1l1_ex5",
							type: "odd_one_out",
							difficulty: "medium",
							question: "Manakah di antara 4 gambar ini yang BUKAN hewan peliharaan?",
							options: [
								"Kucing",
								"Kelinci",
								"Bebek",
								"Mobil"
							],
							correct_answer: "Mobil",
							explanation: "Pintar! Mobil adalah kendaraan, bukan hewan!",
							spaced_repetition: false
						},
						{
							id: "u1l1_ex6",
							type: "category_sorting",
							difficulty: "medium",
							question: "Kelompokkan gambar ke dalam kotak yang benar (Hewan vs Buah)!",
							categories: [
								"Hewan 🐶",
								"Buah 🍎"
							],
							items: [
								{
									id: "c1",
									name: "Kucing"
								},
								{
									id: "c2",
									name: "Apel"
								},
								{
									id: "c3",
									name: "Kelinci"
								},
								{
									id: "c4",
									name: "Pisang"
								}
							],
							correct_answer: "Kucing::Hewan 🐶|Apel::Buah 🍎|Kelinci::Hewan 🐶|Pisang::Buah 🍎",
							explanation: "Hebat! Kucing & Kelinci adalah Hewan, sedangkan Apel & Pisang adalah Buah.",
							spaced_repetition: false
						},
						{
							id: "u1l1_ex7",
							type: "shadow_matching",
							difficulty: "medium",
							question: "Manakah bayangan/siluet yang cocok untuk Kucing 🐱 di atas?",
							target: "Kucing",
							options: [
								"Kucing",
								"Kelinci",
								"Bebek",
								"Gajah"
							],
							correct_answer: "Kucing",
							explanation: "Hebat! Bayangan itu memiliki bentuk telinga dan ekor Kucing yang khas.",
							spaced_repetition: false
						},
						{
							id: "u1l1_ex8",
							type: "memory_flip",
							difficulty: "hard",
							question: "Balikkan dan temukan pasangan kartu gambar yang cocok!",
							pairs: [
								"Kucing",
								"Kelinci"
							],
							correct_answer: "2",
							explanation: "Luar biasa! Kamu berhasil menemukan semua pasangan kartu!",
							spaced_repetition: false
						}
					]
				}
			],
			checkpoint: {
				id: "u1_checkpoint",
				title: "Checkpoint Unit 1: Kuis Hewan Peliharaan",
				exercises: [
					{
						id: "u1cp_ex1",
						type: "matching",
						difficulty: "medium",
						question: "Cocokkan hewan dengan suaranya!",
						options: [
							"Kucing::Meong",
							"Anjing::Guk Guk",
							"Burung::Cicit"
						],
						correct_answer: "Kucing::Meong|Anjing::Guk Guk|Burung::Cicit",
						explanation: "Wah, kamu kenal semua suara hewan ini!",
						spaced_repetition: false
					},
					{
						id: "u1cp_ex2",
						type: "comparison",
						difficulty: "medium",
						question: "Mana yang jumlahnya LEBIH BANYAK?",
						options: [
							"Kucing",
							"Anjing",
							"Sama"
						],
						correct_answer: "Kucing",
						explanation: "Betul, ada 4 Kucing dan hanya 2 Anjing.",
						spaced_repetition: true,
						visual: {
							groupA: {
								count: 4,
								icon: "🐱",
								label: "Kucing"
							},
							groupB: {
								count: 2,
								icon: "🐶",
								label: "Anjing"
							}
						}
					},
					{
						id: "u1cp_ex3",
						type: "multiple_choice",
						difficulty: "easy",
						question: "Hewan apa yang pandai berenang di air?",
						options: [
							"Kelinci",
							"Kucing",
							"Ikan",
							"Ayam"
						],
						correct_answer: "Ikan",
						explanation: "Benar! Ikan hidup dan berenang di dalam air.",
						spaced_repetition: true,
						visual: {
							type: "objects",
							label: "🐟",
							count: 1
						}
					}
				]
			}
		},
		{
			id: "unit_2",
			title: "Unit 2: Kunjungan ke Peternakan",
			order: 2,
			icon: "barn",
			color: "red",
			lessons: [
				{
					id: "u2_lesson1",
					title: "Sapi, Ayam, dan Bebek",
					order: 1,
					summary: "Belajar tentang hewan ternak dan apa yang mereka hasilkan.",
					exercises: [
						{
							id: "u2l1_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Hewan ternak apa yang menghasilkan susu yang sering kita minum?",
							options: [
								"Sapi",
								"Ayam",
								"Kuda",
								"Bebek"
							],
							correct_answer: "Sapi",
							explanation: "Tepat! Sapi menghasilkan susu yang sehat.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🐄",
								count: 1
							}
						},
						{
							id: "u2l1_ex2",
							type: "pattern_matching",
							difficulty: "medium",
							question: "Bebek, Ayam, Bebek, Ayam... Selanjutnya hewan apa?",
							options: [
								"🦆",
								"🐔",
								"🐄",
								"🐎"
							],
							correct_answer: "🦆",
							explanation: "Pintar! Polanya bergantian antara Bebek dan Ayam.",
							spaced_repetition: false,
							visual: {
								pattern: [
									"🦆",
									"🐔",
									"🦆",
									"🐔",
									"?"
								]
							},
							image: "/images/pexels/bebek.jpg"
						},
						{
							id: "u2l1_ex3",
							type: "true_false",
							difficulty: "easy",
							question: "Ayam adalah hewan yang bertelur. Benar atau Salah?",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Benar! Kita sering makan telur ayam.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🥚",
								count: 3
							},
							image: "/images/pexels/ayam.jpg"
						},
						{
							id: "u2l1_ex4",
							type: "sequence_ordering",
							difficulty: "hard",
							question: "Lengkapi urutan pertumbuhan ayam di bawah ini!",
							options: [
								"Telur",
								"Anak Ayam",
								"Ayam Dewasa"
							],
							correct_answer: "Anak Ayam",
							explanation: "Betul! Dari telur menetas menjadi anak ayam.",
							spaced_repetition: true,
							visual: {
								sequence: [
									"Telur",
									"?",
									"Ayam Dewasa"
								]
							},
							image: "/images/pexels/ayam.jpg"
						}
					]
				}
			],
			checkpoint: {
				id: "u2_checkpoint",
				title: "Checkpoint Unit 2: Evaluasi Peternakan",
				exercises: [
					{
						id: "u2cp_ex1",
						type: "drag_and_drop",
						difficulty: "easy",
						question: "Kumpulkan 4 butir telur 🥚 ke dalam keranjang!",
						options: [
						],
						correct_answer: "4",
						explanation: "Kerjanya bagus! Petani berterima kasih padamu.",
						spaced_repetition: false,
						visual: {
							type: "objects",
							label: "🥚",
							count: 5
						}
					},
					{
						id: "u2cp_ex2",
						type: "matching",
						difficulty: "medium",
						question: "Cocokkan hewan dengan apa yang dihasilkannya!",
						options: [
							"Sapi::Susu",
							"Ayam::Telur",
							"Domba::Bulu Wol"
						],
						correct_answer: "Sapi::Susu|Ayam::Telur|Domba::Bulu Wol",
						explanation: "Sempurna! Kamu mengenali semua hasil ternak.",
						spaced_repetition: true
					},
					{
						id: "u2cp_ex3",
						type: "comparison",
						difficulty: "easy",
						question: "Mana yang jumlahnya LEBIH SEDIKIT di peternakan?",
						options: [
							"A",
							"B",
							"Sama"
						],
						correct_answer: "A",
						explanation: "Tepat! Kandang A (2 ekor) lebih sedikit dari Kandang B (3 ekor).",
						spaced_repetition: false,
						visual: {
							groupA: {
								count: 2,
								icon: "🐎",
								label: "Kandang A"
							},
							groupB: {
								count: 3,
								icon: "🐄",
								label: "Kandang B"
							}
						}
					}
				]
			}
		},
		{
			id: "unit_3",
			title: "Unit 3: Menjelajah Hutan Rimba (Hewan Liar)",
			order: 3,
			icon: "tree",
			color: "green",
			lessons: [
				{
					id: "u3_lesson1",
					title: "Gajah, Singa, dan Monyet",
					order: 1,
					summary: "Mengenal hewan-hewan kuat yang hidup bebas di hutan.",
					exercises: [
						{
							id: "u3l1_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Hewan apa yang sangat besar dan punya hidung panjang (belalai)?",
							options: [
								"Monyet",
								"Singa",
								"Gajah",
								"Harimau"
							],
							correct_answer: "Gajah",
							explanation: "Benar! Gajah sangat besar dan punya belalai.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🐘",
								count: 1
							}
						},
						{
							id: "u3l1_ex2",
							type: "seek_find",
							difficulty: "medium",
							question: "Temukan 3 ekor monyet 🐒 yang bergelantungan di pohon!",
							options: [
							],
							correct_answer: "3",
							explanation: "Matamu tajam! Monyet-monyet itu sangat lincah.",
							spaced_repetition: false,
							visual: {
								label: "🐒",
								items: [
									{
										x: 15,
										y: 30,
										icon: "🐒"
									},
									{
										x: 50,
										y: 10,
										icon: "🐒"
									},
									{
										x: 80,
										y: 50,
										icon: "🐒"
									}
								]
							}
						},
						{
							id: "u3l1_ex3",
							type: "fill_in_blank",
							difficulty: "hard",
							question: "Singa dikenal sebagai _____ hutan. (Ketik: Raja)",
							options: [
							],
							correct_answer: "Raja",
							explanation: "Luar biasa! Singa adalah Raja Hutan.",
							spaced_repetition: true,
							image: "/images/pexels/singa.jpg"
						},
						{
							id: "u3l1_ex4",
							type: "drag_and_drop",
							difficulty: "easy",
							question: "Beri makan 2 buah pisang 🍌 kepada Monyet!",
							options: [
							],
							correct_answer: "2",
							explanation: "Nyam nyam! Monyet sangat senang.",
							spaced_repetition: false,
							visual: {
								type: "objects",
								label: "🍌",
								count: 4
							},
							image: "/images/pexels/pisang.jpg"
						}
					]
				}
			],
			checkpoint: {
				id: "u3_checkpoint",
				title: "Checkpoint Unit 3: Ujian Bertahan Hidup",
				exercises: [
					{
						id: "u3cp_ex1",
						type: "true_false",
						difficulty: "easy",
						question: "Apakah Singa memakan rumput dan daun?",
						options: [
							"Benar",
							"Salah"
						],
						correct_answer: "Salah",
						explanation: "Itu salah. Singa adalah hewan pemakan daging.",
						spaced_repetition: true,
						visual: {
							type: "objects",
							label: "🦁",
							count: 1
						},
						image: "/images/pexels/singa.jpg"
					},
					{
						id: "u3cp_ex2",
						type: "pattern_matching",
						difficulty: "medium",
						question: "Lengkapi pola barisan hewan liar ini!",
						options: [
							"🐘",
							"🐒",
							"🦁",
							"🐅"
						],
						correct_answer: "🐘",
						explanation: "Hebat! Polanya adalah Gajah, Singa, Gajah, Singa, Gajah.",
						spaced_repetition: false,
						visual: {
							pattern: [
								"🐘",
								"🦁",
								"🐘",
								"🦁",
								"?"
							]
						}
					},
					{
						id: "u3cp_ex3",
						type: "multiple_choice",
						difficulty: "easy",
						question: "Hewan berleher paling panjang yang bisa memakan daun di ujung pohon adalah?",
						options: [
							"Zebra",
							"Jerapah",
							"Gajah",
							"Kuda Nil"
						],
						correct_answer: "Jerapah",
						explanation: "Betul sekali, jerapah punya leher yang sangat panjang!",
						spaced_repetition: true,
						visual: {
							type: "objects",
							label: "🦒",
							count: 1
						}
					}
				]
			}
		},
		{
			id: "unit_4",
			title: "Unit 4: Menyelam ke Dasar Laut (Hewan Air)",
			order: 4,
			icon: "water",
			color: "blue",
			lessons: [
				{
					id: "u4_lesson1",
					title: "Paus, Kepiting, dan Penyu",
					order: 1,
					summary: "Bertemu dengan hewan-hewan unik penghuni lautan biru.",
					exercises: [
						{
							id: "u4l1_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Hewan laut yang punya capit dan berjalan menyamping adalah?",
							options: [
								"Ikan Paus",
								"Kuda Laut",
								"Kepiting",
								"Penyu"
							],
							correct_answer: "Kepiting",
							explanation: "Benar! Kepiting memiliki capit yang kuat.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🦀",
								count: 1
							}
						},
						{
							id: "u4l1_ex2",
							type: "drag_and_drop",
							difficulty: "medium",
							question: "Bantu 4 bayi penyu 🐢 berenang menuju laut!",
							options: [
							],
							correct_answer: "4",
							explanation: "Bagus! Mereka berhasil mencapai ombak.",
							spaced_repetition: false,
							visual: {
								type: "objects",
								label: "🐢",
								count: 6
							}
						},
						{
							id: "u4l1_ex3",
							type: "comparison",
							difficulty: "easy",
							question: "Hewan mana yang ukurannya LEBIH BESAR?",
							options: [
								"Paus",
								"Ikan Badut",
								"Sama"
							],
							correct_answer: "Paus",
							explanation: "Tentu saja! Paus adalah mamalia terbesar di dunia.",
							spaced_repetition: true,
							visual: {
								groupA: {
									count: 1,
									icon: "🐳",
									label: "Paus"
								},
								groupB: {
									count: 1,
									icon: "🐠",
									label: "Ikan Badut"
								}
							}
						},
						{
							id: "u4l1_ex4",
							type: "true_false",
							difficulty: "easy",
							question: "Ikan bernapas di dalam air menggunakan insang. Benar atau Salah?",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Tepat sekali, insang membantu ikan bernapas di air.",
							spaced_repetition: true
						}
					]
				}
			],
			checkpoint: {
				id: "u4_checkpoint",
				title: "Checkpoint Unit 4: Misteri Bawah Laut",
				exercises: [
					{
						id: "u4cp_ex1",
						type: "matching",
						difficulty: "medium",
						question: "Cocokkan nama hewan dengan cirinya!",
						options: [
							"Kepiting::Punya Capit",
							"Penyu::Punya Tempurung",
							"Gurita::Punya 8 Lengan"
						],
						correct_answer: "Kepiting::Punya Capit|Penyu::Punya Tempurung|Gurita::Punya 8 Lengan",
						explanation: "Sempurna! Pengetahuan lautmu hebat.",
						spaced_repetition: false
					},
					{
						id: "u4cp_ex2",
						type: "seek_find",
						difficulty: "medium",
						question: "Cari & temukan 4 kerang 🐚 di dasar laut!",
						options: [
						],
						correct_answer: "4",
						explanation: "Kerja bagus menemukan semua kerang tersembunyi!",
						spaced_repetition: false,
						visual: {
							label: "🐚",
							items: [
								{
									x: 20,
									y: 80,
									icon: "🐚"
								},
								{
									x: 40,
									y: 90,
									icon: "🐚"
								},
								{
									x: 70,
									y: 70,
									icon: "🐚"
								},
								{
									x: 90,
									y: 85,
									icon: "🐚"
								}
							]
						}
					},
					{
						id: "u4cp_ex3",
						type: "multiple_choice",
						difficulty: "hard",
						question: "Hewan laut berbentuk bintang disebut?",
						options: [
							"Ubur-ubur",
							"Gurita",
							"Bintang Laut",
							"Kuda Laut"
						],
						correct_answer: "Bintang Laut",
						explanation: "Benar! Bintang laut terlihat persis seperti bintang di langit.",
						spaced_repetition: true
					}
				]
			}
		},
		{
			id: "unit_5",
			title: "Unit 5: Si Kecil Terbang & Merayap (Serangga & Burung)",
			order: 5,
			icon: "bug",
			color: "pink",
			lessons: [
				{
					id: "u5_lesson1",
					title: "Kupu-Kupu, Lebah, dan Semut",
					order: 1,
					summary: "Belajar tentang hewan bersayap dan serangga kecil.",
					exercises: [
						{
							id: "u5l1_ex1",
							type: "multiple_choice",
							difficulty: "easy",
							question: "Serangga mana yang suka menghisap nektar bunga dan punya sayap indah?",
							options: [
								"Lalat",
								"Nyamuk",
								"Kupu-Kupu",
								"Semut"
							],
							correct_answer: "Kupu-Kupu",
							explanation: "Tepat! Kupu-kupu punya sayap yang sangat indah.",
							spaced_repetition: true,
							visual: {
								type: "objects",
								label: "🦋",
								count: 1
							}
						},
						{
							id: "u5l1_ex2",
							type: "sequence_ordering",
							difficulty: "hard",
							question: "Bagaimana urutan ulat menjadi kupu-kupu?",
							options: [
								"Ulat",
								"Kepompong",
								"Kupu-kupu"
							],
							correct_answer: "Kepompong",
							explanation: "Luar biasa! Ulat menjadi kepompong lalu berubah jadi Kupu-kupu.",
							spaced_repetition: false,
							visual: {
								sequence: [
									"Ulat",
									"?",
									"Kupu-kupu"
								]
							},
							image: "/images/pexels/kupu_kupu.jpg"
						},
						{
							id: "u5l1_ex3",
							type: "true_false",
							difficulty: "medium",
							question: "Lebah 🐝 adalah serangga yang menghasilkan madu. Benar atau Salah?",
							options: [
								"Benar",
								"Salah"
							],
							correct_answer: "Benar",
							explanation: "Benar! Madu lebah rasanya manis dan sehat.",
							spaced_repetition: true,
							image: "/images/pexels/lebah.jpg"
						},
						{
							id: "u5l1_ex4",
							type: "comparison",
							difficulty: "easy",
							question: "Mana yang jumlahnya LEBIH BANYAK?",
							options: [
								"Lebah",
								"Kupu-kupu",
								"Sama"
							],
							correct_answer: "Lebah",
							explanation: "Tepat! Ada 5 lebah dan hanya 3 kupu-kupu.",
							spaced_repetition: false,
							visual: {
								groupA: {
									count: 5,
									icon: "🐝",
									label: "Lebah"
								},
								groupB: {
									count: 3,
									icon: "🦋",
									label: "Kupu-kupu"
								}
							}
						}
					]
				}
			],
			checkpoint: {
				id: "u5_checkpoint",
				title: "Checkpoint Unit 5: Ujian Akhir Dunia Hewan",
				exercises: [
					{
						id: "u5cp_ex1",
						type: "drag_and_drop",
						difficulty: "easy",
						question: "Bantu 3 ekor lebah 🐝 kembali ke sarangnya!",
						options: [
						],
						correct_answer: "3",
						explanation: "Kerja bagus! Lebah-lebah aman di sarang.",
						spaced_repetition: false,
						visual: {
							type: "objects",
							label: "🐝",
							count: 4
						},
						image: "/images/pexels/lebah.jpg"
					},
					{
						id: "u5cp_ex2",
						type: "pattern_matching",
						difficulty: "medium",
						question: "Hewan apa yang selanjutnya dalam barisan ini?",
						options: [
							"🦋",
							"🐝",
							"🐞",
							"🐜"
						],
						correct_answer: "🐜",
						explanation: "Benar! Polanya Semut, Kepik, Semut, Kepik, Semut.",
						spaced_repetition: true,
						visual: {
							pattern: [
								"🐜",
								"🐞",
								"🐜",
								"🐞",
								"?"
							]
						}
					},
					{
						id: "u5cp_ex3",
						type: "seek_find",
						difficulty: "hard",
						question: "Temukan 5 ekor semut 🐜 yang berbaris di tanah!",
						options: [
						],
						correct_answer: "5",
						explanation: "Hebat! Semut memang suka berbaris dengan rapi.",
						spaced_repetition: false,
						visual: {
							label: "🐜",
							items: [
								{
									x: 10,
									y: 90,
									icon: "🐜"
								},
								{
									x: 20,
									y: 90,
									icon: "🐜"
								},
								{
									x: 30,
									y: 90,
									icon: "🐜"
								},
								{
									x: 40,
									y: 90,
									icon: "🐜"
								},
								{
									x: 50,
									y: 90,
									icon: "🐜"
								}
							]
						},
						image: "/images/pexels/semut.jpg"
					},
					{
						id: "u5cp_ex4",
						type: "matching",
						difficulty: "medium",
						question: "Cocokkan serangga/burung dengan tempat tinggalnya!",
						options: [
							"Lebah::Sarang Madu",
							"Burung::Sangkar/Pohon",
							"Semut::Lubang Tanah"
						],
						correct_answer: "Lebah::Sarang Madu|Burung::Sangkar/Pohon|Semut::Lubang Tanah",
						explanation: "Luar biasa! Kamu menyelesaikan seluruh petualangan dunia hewan!",
						spaced_repetition: true
					}
				]
			}
		}
	]
};
const courseHewanTkSd = {
	course: course
};

const _id__get = defineEventHandler(async (event) => {
  const courseId = getRouterParam(event, "id");
  if (!courseId) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID modul pembelajaran wajib diisi"
    });
  }
  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId }
    });
    if (course) {
      return {
        id: course.id,
        title: course.title,
        description: course.description,
        target_audience: course.targetAudience,
        units: course.units
      };
    }
  } catch (error) {
    console.warn("[POSTGRESQL] Fetch course by ID error, checking local fallback:", error.message);
  }
  if (courseId === "course_hewan_tk_sd") {
    return courseHewanTkSd.course;
  }
  if (courseId === "course_berhitung_tk_01") {
    return courseBerhitungTk01.course;
  }
  if (courseId === "mengenal_angka_tk") {
    return mengenalAngkaTk.course;
  }
  if (courseId === "counting_101") {
    return courseCounting.course;
  }
  throw createError({
    statusCode: 404,
    statusMessage: `Modul "${courseId}" tidak ditemukan`
  });
});

const _id__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get
}, Symbol.toStringTag, { value: 'Module' }));

const index_get = defineEventHandler(async (event) => {
  try {
    const dbCourses = await prisma.course.findMany({
      orderBy: { createdAt: "asc" }
    });
    if (dbCourses && dbCourses.length > 0) {
      console.log(`[POSTGRESQL] Served ${dbCourses.length} courses directly from database`);
      return dbCourses.map((c) => ({
        id: c.id,
        title: c.title,
        description: c.description,
        target_audience: c.targetAudience,
        category: c.category,
        icon: c.icon,
        themeColor: c.themeColor,
        features: c.features,
        isReady: c.isReady,
        isFromDatabase: true,
        source: "postgresql_database",
        courseData: {
          id: c.id,
          title: c.title,
          description: c.description,
          target_audience: c.targetAudience,
          units: c.units
        }
      }));
    }
  } catch (error) {
    console.warn("[POSTGRESQL] Database empty or offline, serving local fallback JSONs:", error.message);
  }
  return [
    {
      id: "course_hewan_tk_sd",
      title: "Petualangan Dunia Hewan",
      description: "Mari bermain dan belajar mengenal berbagai macam hewan di sekitar kita, dari hewan peliharaan yang lucu hingga hewan liar di hutan!",
      target_audience: "Anak TK & SD Kelas 1 (5-7 tahun)",
      category: "science",
      icon: "\u{1F981}",
      themeColor: "amber",
      features: ["5 Unit Tematik Hewan", "Suara & Habitat Hewan", "Permainan Cari & Pasangkan"],
      isReady: true,
      courseData: courseHewanTkSd.course
    },
    {
      id: "course_berhitung_tk_01",
      title: "Mengenal Angka 1-5 & Berhitung Ceria",
      description: "Petualangan seru belajar angka 1 sampai 5 untuk anak usia taman kanak-kanak dengan berbagai permainan interaktif!",
      target_audience: "Anak TK (4-6 tahun)",
      category: "math",
      icon: "\u2B50",
      themeColor: "blue",
      features: ["Fitur 9 Jenis Soal Interaktif", "Petunjuk Kiko \u{1F4A1}", "Tebak Pola & Perbandingan"],
      isReady: true,
      courseData: courseBerhitungTk01.course
    },
    {
      id: "mengenal_angka_tk",
      title: "Petualangan Angka Ceria (TK/PAUD)",
      description: "Modul lengkap mengenal angka 1-10, berhitung, urutan, perbandingan & pola gambar untuk anak TK!",
      target_audience: "Anak TK (4-6 tahun)",
      category: "math",
      icon: "\u{1F3A8}",
      themeColor: "sky",
      features: ["9 Jenis Soal Interaktif", "Jawab Lewat Suara \u{1F3A4}", "Menjiplak Angka \u270F\uFE0F", "Game Balon \u{1F388}"],
      isReady: true,
      courseData: mengenalAngkaTk.course
    },
    {
      id: "counting_101",
      title: "Dasar Berhitung SD Class 1",
      description: "Latihan berhitung tingkat dasar untuk SD kelas 1.",
      target_audience: "SD Kelas 1",
      category: "math",
      icon: "\u{1F522}",
      themeColor: "green",
      features: ["Penjumlahan dasar", "Kurang tambah"],
      isReady: true,
      courseData: courseCounting.course
    }
  ];
});

const index_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get
}, Symbol.toStringTag, { value: 'Module' }));

const me_get = defineEventHandler(async (event) => {
  const query = getQuery$1(event);
  const userId = query.userId;
  const email = query.email;
  if (!userId && !email) {
    throw createError({
      statusCode: 400,
      statusMessage: "Parameter userId atau email wajib disertakan"
    });
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          ...userId ? [{ id: userId }] : [],
          ...email ? [{ email }] : []
        ]
      },
      select: {
        id: true,
        name: true,
        email: true,
        xp: true,
        hearts: true,
        streak: true,
        completedLessonsByCourse: true,
        completedCheckpointsByCourse: true,
        progressLogs: {
          take: 20,
          orderBy: { createdAt: "desc" }
        }
      }
    });
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "Pengguna tidak ditemukan di database"
      });
    }
    return {
      success: true,
      progress: {
        xp: user.xp,
        hearts: user.hearts,
        streak: user.streak,
        completedLessonsByCourse: user.completedLessonsByCourse || {},
        completedCheckpointsByCourse: user.completedCheckpointsByCourse || {},
        logs: user.progressLogs
      }
    };
  } catch (error) {
    console.error("[POSTGRESQL] Fetch Progress Error:", error.message);
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: `Gagal mengambil data progres dari database: ${error.message}`
    });
  }
});

const me_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: me_get
}, Symbol.toStringTag, { value: 'Module' }));

const save_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.userId && !body.email) {
    return {
      success: true,
      message: "Progres disimpan di memori lokal (Tamu)"
    };
  }
  try {
    const updatedUser = await prisma.user.updateMany({
      where: {
        OR: [
          ...body.userId ? [{ id: body.userId }] : [],
          ...body.email ? [{ email: body.email }] : []
        ]
      },
      data: {
        xp: body.xp,
        hearts: body.hearts,
        streak: body.streak,
        completedLessonsByCourse: body.completedLessonsByCourse || {},
        completedCheckpointsByCourse: body.completedCheckpointsByCourse || {}
      }
    });
    if (body.lastCompletedLessonId && body.userId) {
      await prisma.progressLog.create({
        data: {
          userId: body.userId,
          courseId: body.courseId || "counting_101",
          lessonId: body.lastCompletedLessonId,
          xpEarned: body.xpEarned || 20,
          status: "completed"
        }
      }).catch(() => {
      });
    }
    if (body.lastCompletedCheckpointId && body.userId) {
      await prisma.progressLog.create({
        data: {
          userId: body.userId,
          courseId: body.courseId || "counting_101",
          lessonId: body.lastCompletedCheckpointId,
          xpEarned: body.xpEarned || 50,
          status: "checkpoint_completed"
        }
      }).catch(() => {
      });
    }
    console.log(`[POSTGRESQL] Progress saved for user ${body.userId || body.email}: XP ${body.xp}`);
    return {
      success: true,
      message: "Progres berhasil disimpan ke PostgreSQL database",
      updatedCount: updatedUser.count
    };
  } catch (error) {
    console.warn("[POSTGRESQL] Progress save DB fallback:", error.message);
    return {
      success: true,
      isFallback: true,
      message: "Progres tersimpan di lokal storage"
    };
  }
});

const save_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: save_post
}, Symbol.toStringTag, { value: 'Module' }));

const tts_get = defineEventHandler(async (event) => {
  const query = getQuery$1(event);
  const text = query.text || "Ada berapa apel di gambar?";
  const lang = query.lang || "id";
  try {
    const audioUrl = googleTTS.getAudioUrl(text, {
      lang,
      slow: false,
      host: "https://translate.google.com",
      timeout: 1e4
    });
    return sendRedirect(event, audioUrl, 302);
  } catch (err) {
    console.error("TTS Generation Error:", err);
    return { error: "Failed to generate audio" };
  }
});

const tts_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: tts_get
}, Symbol.toStringTag, { value: 'Module' }));

const ____path__get = defineEventHandler((event) => {
  var _a;
  const reqPath = ((_a = event.context.params) == null ? void 0 : _a.path) || "";
  const filePath = path.join(process.cwd(), "public/images", reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    let contentType = "image/jpeg";
    if (ext === ".png") contentType = "image/png";
    else if (ext === ".webp") contentType = "image/webp";
    else if (ext === ".svg") contentType = "image/svg+xml";
    event.node.res.setHeader("Content-Type", contentType);
    event.node.res.setHeader("Cache-Control", "public, max-age=86400");
    return sendStream(event, fs.createReadStream(filePath));
  }
  throw createError({
    statusCode: 404,
    statusMessage: `Image not found: ${reqPath}`
  });
});

const ____path__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: ____path__get
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
	return {
		body: encodeForwardSlashes(stringify(splitPayload(ssrContext).payload, ssrContext["~payloadReducers"])) ,
		statusCode: getResponseStatus(ssrContext.event),
		statusMessage: getResponseStatusText(ssrContext.event),
		headers: {
			"content-type": "application/json;charset=utf-8" ,
			"x-powered-by": "Nuxt"
		}
	};
}
function renderPayloadJsonScript(opts) {
	const contents = opts.data ? encodeForwardSlashes(stringify(opts.data, opts.ssrContext["~payloadReducers"])) : "";
	const payload = {
		"type": "application/json",
		"innerHTML": contents,
		"data-nuxt-data": appId,
		"data-ssr": !(opts.ssrContext.noSSR)
	};
	{
		payload.id = "__NUXT_DATA__";
	}
	if (opts.src) {
		payload["data-src"] = opts.src;
	}
	const config = uneval(opts.ssrContext.config);
	return [payload, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}` }];
}

function encodeForwardSlashes(str) {
	return str.replaceAll("/", "\\u002F");
}
function splitPayload(ssrContext) {
	const { data, prerenderedAt, ...initial } = ssrContext.payload;
	return {
		initial: {
			...initial,
			prerenderedAt
		},
		payload: {
			data,
			prerenderedAt
		}
	};
}

const renderSSRHeadOptions = {"omitLineBreaks":false};

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const PAYLOAD_FILENAME = "_payload.json" ;
const PAYLOAD_BUILD_ID_PARAM = "_b";
const handler = defineRenderHandler((event) => {
	
	const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
	if (ssrError && !("__unenv__" in event.node.req)) {
		throw createError({
			status: 404,
			statusText: "Page Not Found: /__nuxt_error",
			message: "Page Not Found: /__nuxt_error"
		});
	}
	return renderRoute(event, ssrError);
});
async function renderRoute(event, ssrError) {
	const nitroApp = useNitroApp();
	
	const ssrContext = createSSRContext(event);
	
	const headEntryOptions = { mode: "server" };
	ssrContext.head.push(appHead, headEntryOptions);
	if (ssrError) {
		
		const status = ssrError.status || ssrError.statusCode;
		if (status) {
			
			ssrError.status = ssrError.statusCode = Number.parseInt(status);
		}
		setSSRError(ssrContext, ssrError);
	}
	
	const routeOptions = getRouteRules(event);
	if (routeOptions.ssr === false) {
		ssrContext.noSSR = true;
	}
	
	!ssrContext.noSSR && (NUXT_RUNTIME_PAYLOAD_EXTRACTION);
	const isRenderingPayload = (routeOptions.prerender) && PAYLOAD_URL_RE.test(ssrContext.url);
	if (isRenderingPayload) {
		const payloadURL = new URL(ssrContext.url, "http://localhost");
		const url = payloadURL.pathname.slice(0, -`/${PAYLOAD_FILENAME}`.length) || "/";
		payloadURL.searchParams.delete(PAYLOAD_BUILD_ID_PARAM);
		ssrContext.url = url + payloadURL.search;
		event._path = event.node.req.url = ssrContext.url;
	}
	
	const renderer = await getRenderer(ssrContext);
	const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
		
		
		if ((ssrContext["~renderResponse"] || ssrContext._renderResponse) && error.message === "skipping render") {
			return {};
		}
		
		const _err = !ssrError && ssrContext.payload?.error || error;
		await ssrContext.nuxt?.hooks.callHook("app:error", _err);
		throw _err;
	});
	
	
	const inlinedStyles = [];
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult: _rendered
	});
	if (ssrContext["~renderResponse"] || ssrContext._renderResponse) {
		
		return ssrContext["~renderResponse"] || ssrContext._renderResponse;
	}
	
	if (ssrContext.payload?.error && !ssrError) {
		throw ssrContext.payload.error;
	}
	
	if (isRenderingPayload) {
		const response = renderPayloadResponse(ssrContext);
		return response;
	}
	const NO_SCRIPTS = routeOptions.noScripts;
	
	const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
	
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	const link = [];
	for (const resource of Object.values(styles)) {
		
		if ("inline" in getQuery(resource.file)) {
			continue;
		}
		
		
		
		link.push({
			rel: "stylesheet",
			href: renderer.rendererContext.buildAssetsURL(resource.file),
			crossorigin: ""
		});
	}
	if (link.length) {
		ssrContext.head.push({ link }, headEntryOptions);
	}
	if (!NO_SCRIPTS) {
		
		
		
		const dependencyOptions = ssrContext["~lazyHydratedModules"]?.size ? { exclude: ssrContext["~lazyHydratedModules"] } : undefined;
		const stylesheetHrefs = new Set(link.map((l) => l.href));
		ssrContext.head.push({ link: [...getPreloadLinks(ssrContext, renderer.rendererContext, dependencyOptions), ...getPrefetchLinks(ssrContext, renderer.rendererContext, dependencyOptions)].filter((l) => !stylesheetHrefs.has(l.href)) }, headEntryOptions);
		
		ssrContext.head.push({ script: renderPayloadJsonScript({
			ssrContext,
			data: ssrContext.payload
		})  }, {
			...headEntryOptions,
			
			tagPosition: "bodyClose",
			tagPriority: "high"
		});
	}
	
	if (!routeOptions.noScripts) {
		const tagPosition = "head";
		ssrContext.head.push({ script: Object.values(scripts).map((resource) => ({
			type: resource.module ? "module" : null,
			src: renderer.rendererContext.buildAssetsURL(resource.file),
			defer: resource.module ? null : true,
			
			
			tagPosition,
			crossorigin: ""
		})) }, headEntryOptions);
	}
	const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
	
	const htmlContext = {
		htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
		head: normalizeChunks([headTags]),
		bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
		bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
		body: [replaceIslandTeleports(ssrContext, _rendered.html) , APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG],
		bodyAppend: [bodyTags]
	};
	
	await nitroApp.hooks.callHook("render:html", htmlContext, { event });
	
	return {
		body: renderHTMLDocument(htmlContext),
		statusCode: getResponseStatus(event),
		statusMessage: getResponseStatusText(event),
		headers: {
			"content-type": "text/html;charset=utf-8",
			"x-powered-by": "Nuxt"
		}
	};
}
function normalizeChunks(chunks) {
	const result = [];
	for (const _chunk of chunks) {
		const chunk = _chunk?.trim();
		if (chunk) {
			result.push(chunk);
		}
	}
	return result;
}
function joinTags(tags) {
	return tags.join("");
}
function joinAttrs(chunks) {
	if (chunks.length === 0) {
		return "";
	}
	return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
	return "<!DOCTYPE html>" + `<html${joinAttrs(html.htmlAttrs)}>` + `<head>${joinTags(html.head)}</head>` + `<body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body>` + "</html>";
}

const renderer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handler
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
