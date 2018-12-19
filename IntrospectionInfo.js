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
Runtime.IntrospectionInfo = class extends Runtime.CoreStruct{
	/**
	 * Returns true if has annotations by class_name
	 * @string class_name
	 * @return bool
	 */
	hasAnnotation(class_name){
		if (this.annotations == null){
			return false;
		}
		for (var i = 0; i < this.annotations.count(); i++){
			var item = this.annotations.item(i);
			if (Runtime.rtl.is_instanceof(item, class_name)){
				return true;
			}
		}
		return false;
	}
	/**
	 * Returns true if has annotations by class_name
	 * @string class_name
	 * @return bool
	 */
	filterAnnotations(class_name){
		if (this.annotations == null){
			return null;
		}
		return this.annotations.filter((item) => {
			return Runtime.rtl.is_instanceof(item, class_name);
		});
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.IntrospectionInfo";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		this.class_name = "";
		this.kind = "";
		this.name = "";
		this.annotations = null;
	}
	assignObject(obj){
		if (obj instanceof Runtime.IntrospectionInfo){
			this.class_name = Runtime.rtl._clone(obj.class_name);
			this.kind = Runtime.rtl._clone(obj.kind);
			this.name = Runtime.rtl._clone(obj.name);
			this.annotations = Runtime.rtl._clone(obj.annotations);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value){
		if (variable_name == "class_name") this.class_name = Runtime.rtl.correct(value, "string", "", "");
		else if (variable_name == "kind") this.kind = Runtime.rtl.correct(value, "string", "", "");
		else if (variable_name == "name") this.name = Runtime.rtl.correct(value, "string", "", "");
		else if (variable_name == "annotations") this.annotations = Runtime.rtl.correct(value, "Runtime.Vector", null, "Runtime.CoreObject");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "class_name") return this.class_name;
		else if (variable_name == "kind") return this.kind;
		else if (variable_name == "name") return this.name;
		else if (variable_name == "annotations") return this.annotations;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names){
		names.push("class_name");
		names.push("kind");
		names.push("name");
		names.push("annotations");
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
Runtime.IntrospectionInfo.ITEM_CLASS = "class";
Runtime.IntrospectionInfo.ITEM_FIELD = "field";
Runtime.IntrospectionInfo.ITEM_METHOD = "method";