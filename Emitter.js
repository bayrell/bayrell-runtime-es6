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
Runtime.Emitter = class extends Runtime.CoreObject{
	getClassName(){return "Runtime.Emitter";}
	static getParentClassName(){return "Runtime.CoreObject";}
	/**
	 * Constructor
	 */
	constructor(val){
		if (val == undefined) val=null;
		super();
		this.methods = new Runtime.Vector();
		this.subscribers = new Runtime.Vector();
		if (val != null){
			this.methods.push(val);
		}
	}
	/**
	 * Add method
	 * @param callback f
	 * @param Vector<string> events
	 * @return callback
	 */
	addMethod(f, events){
		if (events == undefined) events=null;
		this.methods.push(f);
		return f;
	}
	/**
	 * Remove method
	 * @param callback f
	 */
	removeMethod(f){
		this.methods.removeItem(f);
	}
	/**
	 * Add object
	 * @param SubscribeInterface f
	 * @param Vector<string> events
	 */
	addObject(f, events){
		if (events == undefined) events=null;
		this.subscribers.push(f);
	}
	/**
	 * Remove object
	 * @param SubscribeInterface f
	 */
	removeObject(f){
		this.subscribers.removeItem(f);
	}
	/**
	 * Dispatch event
	 * @param var e
	 */
	emit(e){
		this.dispatch(e);
	}
	/**
	 * Dispatch event
	 * @param var e
	 */
	dispatch(e){
		/* Call self handler */
		this.handlerEvent(e);
		/* Call methods */
		var methods = this.methods.slice();
		methods.each((f) => {
			Runtime.rtl.call(f, e);
		});
		/* Call subscribers */
		var subscribers = this.subscribers.slice();
		subscribers.each((obj) => {
			obj.handlerEvent(e);
		});
	}
	/**
	 * Handler Event
	 */
	handlerEvent(e){
	}
}