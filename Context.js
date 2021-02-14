"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Context = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Context.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Context.prototype.constructor = Runtime.Context;
Object.assign(Runtime.Context.prototype,
{
	/**
	 * Returns enviroment by eky
	 */
	env: function(key, def_value)
	{
		if (def_value == undefined) def_value = "";
		var __v0 = new Runtime.Monad(this);
		__v0 = __v0.attr("enviroments");
		__v0 = __v0.call(Runtime.lib.get(key, def_value));
		return __v0.value();
	},
	/**
	 * Returns settings
	 * @return Dict<string>
	 */
	config: function(items, d)
	{
		if (d == undefined) d = null;
		var __v0 = new Runtime.Monad(this);
		__v0 = __v0.attr("settings");
		__v0 = __v0.call(Runtime.lib.get("config", null));
		__v0 = __v0.call(Runtime.lib.attr(items, d));
		return __v0.value();
	},
	/**
	 * Returns docker secret key
	 */
	secret: function(key)
	{
		var __v0 = new Runtime.Monad(this);
		__v0 = __v0.attr("settings");
		__v0 = __v0.call(Runtime.lib.get("secrets", null));
		__v0 = __v0.call(Runtime.lib.get(key, ""));
		return __v0.value();
	},
	/**
	 * Add driver
	 */
	addDriver: function(obj)
	{
		this.drivers.setValue(obj.getObjectName(), obj);
		return this;
	},
	/**
	 * Add driver
	 */
	getDriver: function(name)
	{
		return this.drivers.get(name, null);
	},
	/* ---------------------- Chain --------------------- */
	/**
	 * Apply Lambda Chain
	 */
	chain: function(chain_name, args)
	{
		var entities = this.entities.filter((item) => 
		{
			return item instanceof Runtime.LambdaChain && item.name == chain_name && item.is_async == false;
		});
		entities = entities.sortIm((a, b) => 
		{
			return a.pos > b.pos;
		});
		for (var i = 0;i < entities.count();i++)
		{
			var item = entities.item(i);
			var item_chain_name = item.chain;
			if (item_chain_name != "")
			{
				args = this.chain(item_chain_name, args);
			}
			else
			{
				var arr = Runtime.rs.split("::", item.value);
				var class_name = arr.get(0, "");
				var method_name = arr.get(1, "");
				var f = Runtime.rtl.method(class_name, method_name);
				args = Runtime.rtl.apply(f, args);
			}
		}
		return args;
	},
	/**
	 * Apply Lambda Chain Await
	 */
	chainAsync: async function(chain_name, args)
	{
		var entities = this.entities.filter((item) => 
		{
			return item instanceof Runtime.LambdaChain && item.name == chain_name;
		});
		entities = entities.sortIm((a, b) => 
		{
			return a.pos > b.pos;
		});
		for (var i = 0;i < entities.count();i++)
		{
			var item = entities.item(i);
			var item_chain_name = item.chain;
			if (item_chain_name != "")
			{
				args = await this.chainAsync(item_chain_name, args);
			}
			else
			{
				var arr = Runtime.rs.split("::", item.value);
				var class_name = arr.get(0, "");
				var method_name = arr.get(1, "");
				var f = Runtime.rtl.method(class_name, method_name);
				if (item.is_async)
				{
					args = await Runtime.rtl.applyAsync(f, args);
				}
				else
				{
					args = Runtime.rtl.apply(f, args);
				}
			}
		}
		return Promise.resolve(args);
	},
	/**
	 * Translate message
	 * @params string space - message space
	 * @params string message - message need to be translated
	 * @params Map params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate: function(space, message, params, locale)
	{
		if (params == undefined) params = null;
		if (locale == undefined) locale = "";
		message = (params == null) ? (message) : (params.reduce((message, value, key) => 
		{
			return Runtime.rs.replace("%" + Runtime.rtl.toStr(key) + Runtime.rtl.toStr("%"), value, message);
		}, message));
		return message;
	},
	_init: function()
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.base_path = null;
		this.enviroments = null;
		this.settings = null;
		this.modules = null;
		this.entities = null;
		this.cli_args = null;
		this.drivers = new Runtime.Map();
		this.initialized = false;
		this.started = false;
		this.start_time = 0;
		this.tz = "UTC";
		this.app_name = "";
		this.entry_point = "";
		this.main_module = "";
		this.main_class = "";
		Runtime.BaseStruct.prototype._init.call(this);
	},
	getClassName: function()
	{
		return "Runtime.Context";
	},
});
Object.assign(Runtime.Context, Runtime.BaseStruct);
Object.assign(Runtime.Context,
{
	/**
	 * Returns app name
	 * @return string
	 */
	appName: function()
	{
		return "";
	},
	/**
	 * Returns context settings
	 * @return Dict<string>
	 */
	getSettings: function(env)
	{
		return null;
	},
	/**
	 * Extends entities
	 */
	getEntities: function(entities)
	{
		return null;
	},
	/**
	 * Create context
	 *
	 * @params Dict env
	 * @params Collection<string> modules
	 * @params Dict settings
	 * @return Context
	 */
	create: function(env)
	{
		if (env == undefined) env = null;
		var settings = Runtime.Dict.from({});
		/* Context data */
		var obj = Runtime.Dict.from({"enviroments":env,"settings":settings,"modules":Runtime.Collection.from([])});
		/* Create context */
		var ctx = this.newInstance(obj);
		return ctx;
	},
	/**
	 * Set main module
	 */
	setMainModule: function(c, main_module)
	{
		var settings = Runtime.Dict.from({});
		var main_module_class_name = "";
		/* Get settings */
		if (main_module)
		{
			main_module_class_name = main_module + Runtime.rtl.toStr(".ModuleDescription");
			if (Runtime.rtl.method_exists(main_module_class_name, "appSettings"))
			{
				var f = Runtime.rtl.method(main_module_class_name, "appSettings");
				settings = f(c.enviroments);
			}
		}
		/* Add main module */
		if (main_module)
		{
			c = Runtime.rtl.setAttr(c, Runtime.Collection.from(["modules"]), c.modules.pushIm(main_module));
		}
		/* Set main module */
		c = Runtime.rtl.setAttr(c, Runtime.Collection.from(["main_module"]), main_module);
		c = Runtime.rtl.setAttr(c, Runtime.Collection.from(["main_class"]), main_module_class_name);
		/* Set entry point */
		c = Runtime.rtl.setAttr(c, Runtime.Collection.from(["entry_point"]), main_module_class_name);
		/* Set new settings */
		c = Runtime.rtl.setAttr(c, Runtime.Collection.from(["settings"]), settings);
		return c;
	},
	/**
	 * Set app name
	 */
	setAppName: function(c, app_name)
	{
		return c.copy(Runtime.Dict.from({"app_name":app_name}));
	},
	/**
	 * Set main class
	 */
	setMainClass: function(c, main_class)
	{
		return c.copy(Runtime.Dict.from({"main_class":main_class,"entry_point":main_class}));
	},
	/**
	 * Set entry point
	 */
	setEntryPoint: function(c, entry_point)
	{
		return c.copy(Runtime.Dict.from({"entry_point":entry_point}));
	},
	/**
	 * Init context
	 */
	appInit: function(c)
	{
		Runtime.rtl.setContext(c);
		if (c.initialized)
		{
			return c;
		}
		/* Extends modules */
		var modules = this.getRequiredModules(c.modules);
		/* Get modules entities */
		var entities = this.getEntitiesFromModules(modules);
		entities = entities.prependCollectionIm(this.getEntities(c.env));
		/* Base path */
		var base_path = (c.base_path != "") ? (c.base_path) : (Runtime.rtl.attr(c.env, Runtime.Collection.from(["BASE_PATH"]), "", "string"));
		/* Add entities */
		if (c.entities != null)
		{
			entities = entities.appendCollectionIm(c.entities);
		}
		c = Runtime.rtl.setAttr(c, Runtime.Collection.from(["entities"]), entities);
		/* Extend entities */
		var __v0 = new Runtime.Monad(c.chain("Runtime.Entities", Runtime.Collection.from([c,entities])));
		__v0 = __v0.attr(1);
		entities = __v0.value();
		entities = this.extendEntities(c, entities);
		entities = this.getRequiredEntities(entities);
		/* Add lambda chains */
		entities = entities.concat(this.getSubEntities(entities, "Runtime.LambdaChainClass", "Runtime.LambdaChain"));
		return c.copy(Runtime.Dict.from({"modules":modules,"entities":entities,"base_path":base_path,"initialized":true}));
	},
	/**
	 * Start context
	 */
	appStart: async function(c)
	{
		Runtime.rtl.setContext(c);
		if (c.started)
		{
			return Promise.resolve(c);
		}
		/* Get drivers from entity */
		var drivers = c.entities.filter((item) => 
		{
			return item instanceof Runtime.Driver;
		});
		/* Create drivers */
		for (var i = 0;i < drivers.count();i++)
		{
			var driver_entity = drivers.item(i);
			var driver_name = driver_entity.name;
			var class_name = driver_entity.value;
			if (class_name == "")
			{
				class_name = driver_entity.name;
			}
			var driver = Runtime.rtl.newInstance(class_name, Runtime.Collection.from([driver_name,driver_entity]));
			var __v0 = new Runtime.Monad(Runtime.rtl.getContext().chain(class_name, Runtime.Collection.from([driver])));
			__v0 = __v0.attr(0);
			driver = __v0.value();
			if (class_name != driver_name)
			{
				var __v1 = new Runtime.Monad(Runtime.rtl.getContext().chain(driver_name, Runtime.Collection.from([driver])));
				__v1 = __v1.attr(0);
				driver = __v1.value();
			}
			if (driver == null)
			{
				throw new Runtime.Exceptions.RuntimeException("Driver '" + Runtime.rtl.toStr(class_name) + Runtime.rtl.toStr("' not found"))
			}
			c.drivers.setValue(driver_name, driver);
		}
		/* Start drivers */
		var keys = c.drivers.keys();
		for (var i = 0;i < keys.count();i++)
		{
			var driver_name = Runtime.rtl.get(keys, i);
			var driver = Runtime.rtl.get(c.drivers, driver_name);
			await driver.startDriver();
			if (driver.entity.global)
			{
				window[driver_name] = driver;
			}
		}
		return Promise.resolve(c.copy(Runtime.Dict.from({"started":true})));
	},
	/**
	 * Init
	 */
	init: async function(c)
	{
		var main_class = c.main_class;
		/* Init app */
		if (main_class != "" && Runtime.rtl.method_exists(main_class, "appInit"))
		{
			var appInit = Runtime.rtl.method(main_class, "appInit");
			c = appInit(c);
		}
		else
		{
			c = c.constructor.appInit(c);
		}
		return Promise.resolve(c);
	},
	/**
	 * Start
	 */
	start: async function(c)
	{
		var main_class = c.main_class;
		/* Start app */
		if (main_class != "" && Runtime.rtl.method_exists(main_class, "appStart"))
		{
			var appStart = Runtime.rtl.method(main_class, "appStart");
			c = await appStart(c);
		}
		else
		{
			c = await c.constructor.appStart(c);
		}
		return Promise.resolve(c);
	},
	/**
	 * Run entry point
	 */
	run: async function(c)
	{
		Runtime.rtl.setContext(c);
		var entry_point = c.entry_point;
		/* Run entrypoint */
		if (entry_point != "")
		{
			var appRun = Runtime.rtl.method(entry_point, "appRun");
			await appRun(c);
		}
		return Promise.resolve(c);
	},
	/* -------------------- Functions ------------------- */
	/**
	 * Returns required modules
	 * @param string class_name
	 * @return Collection<string>
	 */
	_getRequiredModules: function(res, cache, modules, filter)
	{
		if (filter == undefined) filter = null;
		if (modules == null)
		{
			return ;
		}
		if (filter)
		{
			modules = modules.filter(filter);
		}
		for (var i = 0;i < modules.count();i++)
		{
			var module_name = modules.item(i);
			if (cache.get(module_name, false) == false)
			{
				cache.setValue(module_name, true);
				var f = Runtime.rtl.method(module_name + Runtime.rtl.toStr(".ModuleDescription"), "requiredModules");
				var sub_modules = f();
				if (sub_modules != null)
				{
					var sub_modules = sub_modules.keys();
					this._getRequiredModules(res, cache, sub_modules);
				}
				res.pushValue(module_name);
			}
		}
	},
	/**
	 * Returns all modules
	 * @param Collection<string> modules
	 * @return Collection<string>
	 */
	getRequiredModules: function(modules)
	{
		var res = new Runtime.Vector();
		var cache = new Runtime.Map();
		this._getRequiredModules(res, cache, modules);
		res = res.removeDuplicates();
		return res.toCollection();
	},
	/**
	 * Returns modules entities
	 */
	getEntitiesFromModules: function(modules)
	{
		var entities = new Runtime.Vector();
		for (var i = 0;i < modules.count();i++)
		{
			var module_class_name = modules.item(i) + Runtime.rtl.toStr(".ModuleDescription");
			if (Runtime.rtl.method_exists(module_class_name, "entities"))
			{
				var f = Runtime.rtl.method(module_class_name, "entities");
				var arr = f();
				entities.appendVector(arr);
			}
		}
		return entities.toCollection();
	},
	/**
	 * Extend entities
	 */
	getRequiredEntities: function(entities)
	{
		var e = entities.toVector();
		for (var i = 0;i < entities.count();i++)
		{
			var item1 = entities.item(i);
			var item1_class_name = item1.getClassName();
			if (item1_class_name == "Runtime.Entity")
			{
				var class_name = (item1.value != "") ? (item1.value) : (item1.name);
				var annotations = Runtime.rtl.getClassAnnotations(class_name);
				for (var j = 0;j < annotations.count();j++)
				{
					var item2 = annotations.item(j);
					var item2_class_name = item2.getClassName();
					if (item2 instanceof Runtime.Entity && item2_class_name != "Runtime.Entity")
					{
						item2 = item2.copy(Runtime.Dict.from({"name":class_name}));
						e.pushValue(item2);
					}
				}
			}
		}
		return e.toCollection();
	},
	/**
	 * Returns sub entities from classes
	 */
	getSubEntities: function(entitites, entity_class_name, entity_class_method)
	{
		var class_names = entitites.filter(Runtime.lib.isInstance(entity_class_name));
		var methods = new Runtime.Vector();
		methods.appendVector(entitites.filter(Runtime.lib.isInstance(entity_class_method)));
		for (var class_names_inc = 0;class_names_inc < class_names.count();class_names_inc++)
		{
			var class_item = Runtime.rtl.get(class_names, class_names_inc);
			var class_name = class_item.name;
			if (class_name == "")
			{
				continue;
			}
			var annotations = Runtime.rtl.getMethodsAnnotations(class_name);
			annotations.each((annotations, class_method_name) => 
			{
				var method_info = Runtime.rtl.methodApply(class_name, "getMethodInfoByName", Runtime.Collection.from([class_method_name]));
				for (var annotations_inc = 0;annotations_inc < annotations.count();annotations_inc++)
				{
					var annotation = Runtime.rtl.get(annotations, annotations_inc);
					if (annotation)
					{
						if (Runtime.rtl.is_instanceof(annotation, entity_class_method))
						{
							annotation = annotation.addClassItem(class_name, class_method_name, class_item, method_info);
							methods.pushValue(annotation);
						}
					}
				}
			});
		}
		return methods;
	},
	/**
	 * Extends entities
	 */
	extendEntities: function(c, entities)
	{
		return entities;
	},
	/**
	 * Start App
	 */
	startApp: async function(env, module_name, main_class)
	{
		var context = this.create(env);
		/* Set global context */
		Runtime.rtl.setContext(context);
		Runtime.rtl.setContext(context);
		window["globalContext"] = context;
		context = context.constructor.setAppName(context, module_name);
		context = context.constructor.setMainModule(context, module_name);
		context = context.constructor.setMainClass(context, main_class);
		context = context.constructor.setEntryPoint(context, main_class);
		/* Init context */
		context = await context.constructor.init(context);
		/* Start context */
		context = await context.constructor.start(context);
		/* Set global context */
		Runtime.rtl.setContext(context);
		Runtime.rtl.setContext(context);
		window["globalContext"] = context;
		try
		{
			/* Run app */
			await context.constructor.run(context);
		}
		catch (_ex)
		{
			if (true)
			{
				var e = _ex;
				
				console.log( e.stack );
			}
			else
			{
				throw _ex;
			}
		}
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Context";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f&3)==3)
		{
			a.push("base_path");
			a.push("enviroments");
			a.push("settings");
			a.push("modules");
			a.push("entities");
			a.push("cli_args");
			a.push("drivers");
			a.push("initialized");
			a.push("started");
			a.push("start_time");
			a.push("tz");
			a.push("app_name");
			a.push("entry_point");
			a.push("main_module");
			a.push("main_class");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "base_path") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enviroments") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "settings") return Dict.from({
			"t": "Runtime.Dict",
			"s": ["var"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "modules") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "entities") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["Runtime.BaseStruct"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "cli_args") return Dict.from({
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "drivers") return Dict.from({
			"t": "Runtime.Map",
			"s": ["Runtime.BaseDriver"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "initialized") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "started") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "start_time") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "tz") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "app_name") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "entry_point") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "main_module") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "main_class") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Context);
window["Runtime.Context"] = Runtime.Context;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Context;