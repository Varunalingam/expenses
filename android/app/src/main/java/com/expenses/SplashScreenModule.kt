package com.expenses

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SplashScreenModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "SplashScreenModule"

  @ReactMethod
  fun hide() {
    val activity = reactContext.currentActivity
    SplashScreen.hide(activity)
  }
}
