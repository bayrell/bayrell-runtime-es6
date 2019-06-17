"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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

var isBrowser=function(){return typeof window !== "undefined" && this === window;}
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.RuntimeUtils = class{
	/* ================================ Context Functions ================================ */
	/**
	 * Returns global context
	 * @return ContextInterface
	 */
	static getContext(){
		
		return Runtime.RuntimeUtils._global_context;
	}
	/**
	 * Set global context
	 * @param ContextInterface context
	 */
	static setContext(context){
		
		if (isBrowser()) Runtime.RuntimeUtils._global_context = context;
		else RuntimeUtils._global_context = context;
		return context;
	}
	/**
	 * Register global Context
	 */
	static createContext(modules){
		if (modules == undefined) modules=null;
		var context = new Runtime.Context();
		if (modules != null){
			modules.each((module) => {
				context.registerModule(module);
			});
		}
		return context;
	}
	/**
	 * Register global Context
	 */
	static registerGlobalContext(modules){
		if (modules == undefined) modules=null;
		var context = Runtime.RuntimeUtils.createContext(modules);
		Runtime.RuntimeUtils.setContext(context);
		return context;
	}
	/* ========================== Class Introspection Functions ========================== */
	/**
	 * Returns parents class names
	 * @return Vector<string>
	 */
	static getParents(class_name){
		var res = new Runtime.Vector();
		while (class_name != ""){
			var f = Runtime.rtl.method(class_name, "getParentClassName");
			class_name = f();
			if (class_name != ""){
				res.push(class_name);
			}
		}
		return res;
	}
	/**
	 * Returns true if class exists
	 * @return Vector<string>
	 */
	
	static getInterfaces(class_name){
		return new Vector();
	}
	/**
	 * Returns names of variables to serialization
	 * @param Vector<string>
	 */
	static getVariablesNames(class_name, names, flag){
		if (flag == undefined) flag=0;
		var variables_names = Runtime.RuntimeUtils._variables_names;
		if (variables_names == null){
			Runtime.RuntimeUtils._variables_names = new Runtime.Map();
		}
		if (Runtime.RuntimeUtils._variables_names.has(class_name)){
			var m = Runtime.RuntimeUtils._variables_names;
			var v = m.item(class_name);
			if (v.has(flag)){
				names.appendVector(v.item(flag));
				return ;
			}
		}
		var classes = Runtime.RuntimeUtils.getParents(class_name);
		classes.prepend(class_name);
		classes.each((class_name) => {
			try{
				Runtime.rtl.method(class_name, "getFieldsList")(names, flag);
			}catch(_the_exception){
				if (_the_exception instanceof Error){
					var e = _the_exception;
				}
				else { throw _the_exception; }
			}
			try{
				Runtime.rtl.method(class_name, "getVirtualFieldsList")(names, flag);
			}catch(_the_exception){
				if (_the_exception instanceof Error){
					var e = _the_exception;
				}
				else { throw _the_exception; }
			}
		});
		names = names.removeDublicatesIm();
		var variables_names = Runtime.RuntimeUtils._variables_names;
		if (!Runtime.RuntimeUtils._variables_names.has(class_name)){
			Runtime.RuntimeUtils._variables_names.set(class_name, (new Runtime.Map()));
		}
		var v = Runtime.RuntimeUtils._variables_names.item(class_name);
		v.set(flag, names.copy());
		Runtime.RuntimeUtils._variables_names.set(class_name, v);
		/*RuntimeUtils::_variables_names.set(class_name, names.copy());*/
	}
	/**
	 * Returns Introspection of the class name
	 * @param string class_name
	 * @return Vector<IntrospectionInfo>
	 */
	static getIntrospection(class_name){
		var res = new Runtime.Vector();
		var class_names = Runtime.RuntimeUtils.getParents(class_name);
		class_names.prepend(class_name);
		class_names.each((item_class_name) => {
			var names = new Runtime.Vector();
			/* Get fields introspection */
			try{
				Runtime.rtl.method(item_class_name, "getFieldsList")(names);
			}catch(_the_exception){
				if (_the_exception instanceof Error){
					var e = _the_exception;
				}
				else { throw _the_exception; }
			}
			names.each((field_name) => {
				var info = null;
				try{
					info = Runtime.rtl.method(item_class_name, "getFieldInfoByName")(field_name);
				}catch(_the_exception){
					if (_the_exception instanceof Error){
						var e = _the_exception;
						info = null;
					}
					else { throw _the_exception; }
				}
				if (info != null){
					info = info.copy( new Runtime.Map({ "class_name": item_class_name })  );
					res.push(info);
				}
			});
			/* Get virtual fields introspection */
			names.clear();
			try{
				Runtime.rtl.method(item_class_name, "getVirtualFieldsList")(names);
			}catch(_the_exception){
				if (_the_exception instanceof Error){
					var e = _the_exception;
				}
				else { throw _the_exception; }
			}
			names.each((field_name) => {
				var info = null;
				try{
					info = Runtime.rtl.method(item_class_name, "getVirtualFieldInfo")(field_name);
				}catch(_the_exception){
					if (_the_exception instanceof Error){
						var e = _the_exception;
						info = null;
					}
					else { throw _the_exception; }
				}
				if (info != null){
					info = info.copy( new Runtime.Map({ "class_name": item_class_name })  );
					res.push(info);
				}
			});
			/* Get methods introspection */
			names.clear();
			try{
				Runtime.rtl.method(item_class_name, "getMethodsList")(names);
			}catch(_the_exception){
				if (_the_exception instanceof Error){
					var e = _the_exception;
				}
				else { throw _the_exception; }
			}
			names.each((method_name) => {
				var info = null;
				try{
					info = Runtime.rtl.method(item_class_name, "getMethodInfoByName")(method_name);
				}catch(_the_exception){
					if (_the_exception instanceof Error){
						var e = _the_exception;
						info = null;
					}
					else { throw _the_exception; }
				}
				if (info != null){
					info = info.copy( new Runtime.Map({ "class_name": item_class_name })  );
					res.push(info);
				}
			});
			/* Get class introspection */
			var info = null;
			try{
				info = Runtime.rtl.method(item_class_name, "getClassInfo")();
			}catch(_the_exception){
				if (_the_exception instanceof Error){
					var e = _the_exception;
					info = null;
				}
				else { throw _the_exception; }
			}
			if (info != null){
				info = info.copy( new Runtime.Map({ "class_name": item_class_name })  );
				res.push(info);
			}
		});
		return res.toCollection();
	}
	/**
	 * Returns item
	 */
	static getItem(obj, path, default_value, type_value, type_template){
		if (type_value == undefined) type_value="mixed";
		if (type_template == undefined) type_template="";
		if (path.count() == 0){
			return Runtime.rtl.convert(obj, type_value, default_value, type_template);
		}
		if (obj == null){
			return default_value;
		}
		if (obj instanceof Runtime.Dict || obj instanceof Runtime.Collection){
			var item = path.first();
			path = path.removeFirstIm();
			obj = obj.get(item, default_value);
			return this.getItem(obj, path, default_value, type_value, type_template);
		}
		return default_value;
	}
	/* ============================= Serialization Functions ============================= */
	static ObjectToNative(value, force_class_name){
		if (force_class_name == undefined) force_class_name=false;
		value = Runtime.RuntimeUtils.ObjectToPrimitive(value, force_class_name);
		value = Runtime.RuntimeUtils.PrimitiveToNative(value);
		return value;
	}
	static NativeToObject(value){
		value = Runtime.RuntimeUtils.NativeToPrimitive(value);
		value = Runtime.RuntimeUtils.PrimitiveToObject(value);
		return value;
	}
	/**
	 * Returns object to primitive value
	 * @param mixed obj
	 * @return mixed
	 */
	static ObjectToPrimitive(obj, force_class_name){
		if (force_class_name == undefined) force_class_name=false;
		if (obj === null){
			return null;
		}
		if (Runtime.rtl.isScalarValue(obj)){
			return obj;
		}
		if (obj instanceof Runtime.Collection){
			return obj.map((value) => {
				return this.ObjectToPrimitive(value, force_class_name);
			});
		}
		if (obj instanceof Runtime.Dict){
			obj = obj.map((key, value) => {
				return this.ObjectToPrimitive(value, force_class_name);
			});
			if (force_class_name){
				obj = obj.setIm("__class_name__", "Runtime.Dict");
			}
			return obj.toDict();
		}
		if (Runtime.rtl.implements(obj, Runtime.Interfaces.SerializeInterface)){
			var names = new Runtime.Vector();
			var values = new Runtime.Map();
			obj.getVariablesNames(names, 1);
			for (var i = 0; i < names.count(); i++){
				var variable_name = names.item(i);
				var value = obj.takeValue(variable_name, null);
				var value = Runtime.RuntimeUtils.ObjectToPrimitive(value, force_class_name);
				values.set(variable_name, value);
			}
			values.set("__class_name__", obj.getClassName());
			return values;
		}
		return null;
	}
	/**
	 * Returns object to primitive value
	 * @param SerializeContainer container
	 * @return mixed
	 */
	static PrimitiveToObject(obj){
		if (obj === null){
			return null;
		}
		if (Runtime.rtl.isScalarValue(obj)){
			return obj;
		}
		if (obj instanceof Runtime.Collection){
			var res = new Runtime.Vector();
			for (var i = 0; i < obj.count(); i++){
				var value = obj.item(i);
				value = Runtime.RuntimeUtils.PrimitiveToObject(value);
				res.push(value);
			}
			return res.toCollection();
		}
		if (obj instanceof Runtime.Dict){
			var res = new Runtime.Map();
			var keys = obj.keys();
			for (var i = 0; i < keys.count(); i++){
				var key = keys.item(i);
				var value = obj.item(key);
				value = Runtime.RuntimeUtils.PrimitiveToObject(value);
				res.set(key, value);
			}
			if (!res.has("__class_name__")){
				return res;
			}
			if (res.item("__class_name__") == "Runtime.Map" || res.item("__class_name__") == "Runtime.Dict"){
				res.remove("__class_name__");
				return res.toDict();
			}
			var class_name = res.item("__class_name__");
			if (!Runtime.rtl.class_exists(class_name)){
				return null;
			}
			if (!Runtime.rtl.class_implements(class_name, "Runtime.Interfaces.SerializeInterface")){
				return null;
			}
			var instance = Runtime.rtl.newInstance(class_name, null);
			var names = new Runtime.Vector();
			instance.getVariablesNames(names, 1);
			for (var i = 0; i < names.count(); i++){
				var variable_name = names.item(i);
				if (variable_name != "__class_name__"){
					var value = res.get(variable_name, null);
					instance.assignValue(variable_name, value);
				}
			}
			if (instance instanceof Runtime.CoreStruct){
				instance.initData();
			}
			return instance;
		}
		return null;
	}
	
	static NativeToPrimitive(value){
		
		var _rtl = null; if (isBrowser()) _rtl=Runtime.rtl; else _rtl=rtl;
		var _Utils = null; if (isBrowser()) _Utils=Runtime.RuntimeUtils; else _Utils=RuntimeUtils;
		var _Vector=null; if (isBrowser()) _Vector=Runtime.Vector; else _Vector=Vector;
		var _Map=null; if (isBrowser()) _Map=Runtime.Map; else _Map=Map;
		
		if (value === null)
			return null;
		
		if (Array.isArray(value)){
			var new_value = (new _Vector()).concat(value);
			new_value = new_value.map((val)=>{
				return _Utils.NativeToPrimitive(val);
			});
			return new_value;
		}
		if (typeof value == 'object'){
			var new_value = new _Map(value);
			new_value = new_value.map((key, val)=>{
				return _Utils.NativeToPrimitive(val);
			});
			return new_value;
		}
		
		return value;
	}
	static PrimitiveToNative(value){
		
		var _rtl = null; if (isBrowser()) _rtl=Runtime.rtl; else _rtl=rtl;
		var _Utils = null; if (isBrowser()) _Utils=Runtime.RuntimeUtils; else _Utils=Utils;
		var _Vector=null; if (isBrowser()) _Vector=Runtime.Vector; else _Vector=Vector;
		var _Map=null; if (isBrowser()) _Map=Runtime.Map; else _Map=Map;
		
		if (value === null)
			return null;
		
		if (value instanceof _Vector){
			var arr = [];
			value.each((v)=>{
				arr.push( _Utils.PrimitiveToNative(v) );
			});
			return arr;
		}
		if (value instanceof _Map){
			var obj = {};
			value.each((k, v)=>{
				obj[k] = _Utils.PrimitiveToNative(v);
			});
			return obj;
		}
		
		return value;
	}
	/**
	 * Json encode serializable values
	 * @param serializable value
	 * @param SerializeContainer container
	 * @return string 
	 */
	
	static json_encode(value, flags, convert){
		if (flags == undefined) flags = 0;
		if (convert == undefined) convert = true;
		var _Utils=null;if (isBrowser()) _Utils=Runtime.RuntimeUtils; else _Utils=RuntimeUtils;
		var _Collection=null;if (isBrowser()) _Collection=Runtime.Collection; else _Collection=Collection;
		var _Dict=null;if (isBrowser()) _Dict=Runtime.Dict; else _Dict=Dict;
		var _rtl=null;if (isBrowser()) _rtl=Runtime.rtl; else _rtl=rtl;
		if (convert) value = _Utils.ObjectToPrimitive(value);
		return JSON.stringify(value, function (key, value){
			if (_rtl.isScalarValue(value)) return value;
			if (value instanceof _Collection) return value;
			if (value instanceof _Dict) return value.toObject();
			return null;
		});
	}
	/**
	 * Json decode to primitive values
	 * @param string s Encoded string
	 * @return mixed 
	 */
	
	static json_decode(s, context){
		try{
			var _Utils=null;if (isBrowser()) _Utils=Runtime.RuntimeUtils; else _Utils=RuntimeUtils;
			var _Vector=null;if (isBrowser()) _Vector=Runtime.Vector; else _Vector=Vector;
			var _Map=null;if (isBrowser()) _Map=Runtime.Map; else _Map=Map;			
			var obj = JSON.parse(s, function (key, value){
				if (value == null) return value;
				if (Array.isArray(value)){
					return _Vector.createNewInstance(value);
				}
				if (typeof value == 'object'){
					return new _Map(value);
				}
				return value;
			});
			return _Utils.PrimitiveToObject(obj);
		}
		catch(e){
			return null;
		}
	}
	/**
	 * Base64 encode
	 * @param string s
	 * @return string 
	 */
	
	static base64_encode(s){
		return window.btoa(s);
	}
	/**
	 * Base64 decode
	 * @param string s
	 * @return string 
	 */
	
	static base64_decode(s){
		return window.atob(s);
	}
	/* ================================= Other Functions ================================= */
	/*
	 * Generate password
	 *
	 * @param int length The lenght of the password
	 * @param string options What kinds of the char can be in password
	 *   a - lower case chars
	 *   b - upper case chars
	 *   c - numbers
	 *   d - special chars !@#$%^&?*_-+=~(){}[]<>|/,.:;\\
	 *   e - quotes `"'
	 */
	static randomString(length, options){
		if (length == undefined) length=16;
		if (options == undefined) options="abc";
		var s = "";
		if (Runtime.rs.strpos(options, "a") >= 0){
			s += "abcdefghjkmnpqrstuvwxyz";
		}
		if (Runtime.rs.strpos(options, "b") >= 0){
			s += "ABCDEFGHJKMNPQRSTUVWXYZ";
		}
		if (Runtime.rs.strpos(options, "c") >= 0){
			s += "1234567890";
		}
		if (Runtime.rs.strpos(options, "d") >= 0){
			s += "!@#$%^&?*_-+=~(){}[]<>|/,.:;\\";
		}
		if (Runtime.rs.strpos(options, "e") >= 0){
			s += "`\"'";
		}
		var res = "";
		var c = Runtime.rs.strlen(s);
		for (var i = 0; i < length; i++){
			var k = Runtime.rtl.random(0, c - 1);
			res += s[k];
		}
		return res;
	}
	/**
	 * Returns true if value is primitive value
	 * @return boolean 
	 */
	static isPrimitiveValue(value){
		if (Runtime.rtl.isScalarValue(value)){
			return true;
		}
		if (value instanceof Runtime.Vector){
			return true;
		}
		if (value instanceof Runtime.Map){
			return true;
		}
		return false;
	}
	/**
	 * Convert bytes to string
	 * @param Vector<byte> arr - vector of the bytes
	 * @string charset - charset of the bytes vector. Default utf8
	 * @return string
	 */
	static bytesToString(arr, charset){
		if (charset == undefined) charset="utf8";
		
		var decoder = new TextDecoder(charset);
		var bytes = new Uint8Array(arr);
		return decoder.decode(bytes);
	}
	/**
	 * Convert string to bytes
	 * @param string s - incoming string
	 * @param Vector<byte> arr - output vector
	 * @param charset - Result bytes charset. Default utf8
	 */
	static stringToBytes(s, arr, charset){
		if (charset == undefined) charset="utf8";
		
		var encoder = new TextEncoder(charset);
		var bytes = encoder.encode(s);
		return Runtime.Collection.create(bytes);
	}
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params MapInterface params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	static translate(message, params, locale, context){
		if (params == undefined) params=null;
		if (locale == undefined) locale="";
		if (context == undefined) context=null;
		if (context == null){
			context = Runtime.RuntimeUtils.getContext();
		}
		if (context != null){
			var args = (new Runtime.Vector()).push(message).push(params).push(locale);
			return Runtime.rtl.callMethod(context, "translate", args);
		}
		return message;
	}
	/**
	 * Retuns css hash 
	 * @param string component class name
	 * @return string hash
	 */
	static getCssHash(s){
		var arr = "1234567890abcdef";
		var arr_sz = 16;
		var arr_mod = 65536;
		var sz = Runtime.rs.strlen(s);
		var hash = 0;
		for (var i = 0; i < sz; i++){
			var ch = Runtime.rs.ord(s[i]);
			hash = (hash << 2) + (hash >> 14) + ch & 65535;
		}
		var res = "";
		var pos = 0;
		var c = 0;
		while (hash != 0 || pos < 4){
			c = hash & 15;
			hash = hash >> 4;
			res += arr[c];
			pos++;
		}
		return res;
	}
	/**
	 * Normalize UIStruct
	 */
	static normalizeUIVector(data){
		if (data instanceof Runtime.Collection){
			var res = new Runtime.Vector();
			for (var i = 0; i < data.count(); i++){
				var item = data.item(i);
				if (item instanceof Runtime.Collection){
					var new_item = this.normalizeUIVector(item);
					res.appendVector(new_item);
				}
				else if (item instanceof Runtime.UIStruct){
					res.push(item);
				}
				else if (Runtime.rtl.isString(item)){
					res.push(new Runtime.UIStruct((new Runtime.Map()).set("kind", Runtime.UIStruct.TYPE_RAW).set("content", Runtime.rtl.toString(item))));
				}
			}
			return res.toCollection();
		}
		else if (data instanceof Runtime.UIStruct){
			return new Runtime.Collection(this.normalizeUI(data));
		}
		else if (Runtime.rtl.isString(data)){
			return new Runtime.Collection(this.normalizeUI(data));
		}
		return null;
	}
	/**
	 * Normalize UIStruct
	 */
	static normalizeUI(data){
		if (data instanceof Runtime.UIStruct){
			var obj = (new Runtime.Map()).set("children", this.normalizeUIVector(data.children));
			if (data.props != null && data.props instanceof Runtime.Map){
				obj.set("props", data.props.toDict());
			}
			return data.copy(obj);
		}
		else if (Runtime.rtl.isString(data)){
			return new Runtime.UIStruct((new Runtime.Map()).set("kind", Runtime.UIStruct.TYPE_RAW).set("content", Runtime.rtl.toString(data)));
		}
		return null;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.RuntimeUtils";}
	static getCurrentNamespace(){return "Runtime";}
	static getCurrentClassName(){return "Runtime.RuntimeUtils";}
	static getParentClassName(){return "";}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
	}
	static getFieldInfoByName(field_name){
		return null;
	}
	static getMethodsList(names){
	}
	static getMethodInfoByName(method_name){
		return null;
	}
}
Runtime.RuntimeUtils._global_context = null;
Runtime.RuntimeUtils._variables_names = null;
Runtime.RuntimeUtils.JSON_PRETTY = 1;