"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Context = class extends Runtime.CoreObject{
	getClassName(){return "Runtime.Context";}
	static getParentClassName(){return "Runtime.CoreObject";}
	/**
	 * Constructor
	 */
	constructor(){
		super();
		this._modules = new Runtime.Vector();
		this._providers_names = new Runtime.Map();
		this._managers = new Runtime.Map();
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
	/**
	 * Returns registed modules
	 * @return Vector<string>
	 */
	getModules(){
		return this._modules.slice();
	}
	/**
	 * Register module
	 */
	registerModule(module_name){
		var module_description_class_name = Runtime.rtl.toString(module_name)+".ModuleDescription";
		if (this._modules.indexOf(module_description_class_name) != -1){
			return ;
		}
		this._modules.push(module_description_class_name);
		/* Call onRegister */
		var args = (new Runtime.Vector()).push(this);
		Runtime.rtl.callStaticMethod(module_description_class_name, "onRegister", args);
		/* Register required Modules*/
		var modules = Runtime.rtl.callStaticMethod(module_description_class_name, "getRequiredModules", args);
		if (modules != null){
			var keys = modules.keys();
			var sz = keys.count();
			for (var i = 0; i < sz; i++){
				var module_name = keys.item(i);
				this.registerModule(module_name);
			}
		}
		return this;
	}
	/**
	 * Register module
	 * @param string provider_name
	 * @param FactoryInterface factory
	 */
	registerProviderFactory(provider_name, factory){
		if (!this._providers_names.has(provider_name)){
			this._providers_names.set(provider_name, factory);
		}
		return this;
	}
	/**
	 * Register manager
	 * @param string manager_name
	 * @param FactoryInterface factory
	 */
	registerManager(manager_name, obj){
		if (!this._managers.has(manager_name)){
			this._managers.set(manager_name, obj);
		}
		return this;
	}
	/**
	 * Init context
	 */
	init(){
		var args = new Runtime.Vector();
		args.push(this);
		var sz = this._modules.count();
		for (var i = 0; i < sz; i++){
			var module_description_class_name = this._modules.item(i);
			Runtime.rtl.callStaticMethod(module_description_class_name, "initContext", args);
		}
	}
	/**
	 * Returns provider
	 *
	 * @params string provider_name
	 * @return CoreObject
	 */
	createProvider(provider_name){
		if (!this._providers_names.has(provider_name)){
			return null;
		}
		var factory_obj = this._providers_names.item(provider_name);
		if (factory_obj == null){
			return null;
		}
		var obj = factory_obj.newInstance(this);
		return obj;
	}
	/**
	 * Returns manager
	 *
	 * @params string manager_name
	 * @return CoreObject
	 */
	getManager(manager_name){
		if (this._managers.has(manager_name)){
			return this._managers.item(manager_name);
		}
		return null;
	}
	/**
	 * Set application locale
	 * @params string locale
	 */
	setLocale(locale){
		this._locale = locale;
	}
	/**
	 * Get application locale
	 * @params string locale
	 */
	getLocale(){
		return this._locale;
	}
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params Map params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate(message, params, locale){
		if (params == undefined) params=null;
		if (locale == undefined) locale="";
		return message;
	}
}
Runtime.Context.__static_implements__ = [];
Runtime.Context.__static_implements__.push(Runtime.Interfaces.ContextInterface)