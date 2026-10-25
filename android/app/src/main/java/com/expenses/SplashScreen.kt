package com.expenses

import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.app.Activity
import android.app.Dialog
import android.os.Handler
import android.os.Looper
import android.view.ViewGroup
import java.lang.ref.WeakReference

object SplashScreen {
  private var dialogRef: WeakReference<Dialog>? = null
  private val mainHandler = Handler(Looper.getMainLooper())
  private var isHidden = false

  @JvmStatic
  fun show(activity: Activity) {
    if (activity.isFinishing || activity.isDestroyed) return
    isHidden = false

    mainHandler.post {
      try {
        val dialog = Dialog(activity, R.style.SplashScreen_Fullscreen).apply {
          setContentView(R.layout.launch_screen)
          setCancelable(false)
          setCanceledOnTouchOutside(false)
          window?.setLayout(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
          )
        }
        dialog.show()
        dialogRef = WeakReference(dialog)

        // Safety fallback: dismiss after 4 seconds if JS never calls hide()
        mainHandler.postDelayed({
          hide(activity)
        }, 4000)
      } catch (_: Exception) {}
    }
  }

  @JvmStatic
  fun hide(activity: Activity? = null) {
    if (isHidden) return
    isHidden = true

    mainHandler.post {
      val dialog = dialogRef?.get() ?: return@post
      dialogRef = null

      if (!dialog.isShowing) return@post

      val targetActivity = activity ?: dialog.ownerActivity
      if (targetActivity != null && (targetActivity.isFinishing || targetActivity.isDestroyed)) {
        return@post
      }

      val contentView = dialog.findViewById<ViewGroup>(android.R.id.content)
      if (contentView != null) {
        contentView.animate()
          .alpha(0f)
          .setDuration(250)
          .setListener(object : AnimatorListenerAdapter() {
            override fun onAnimationEnd(animation: Animator) {
              try {
                if (dialog.isShowing) {
                  dialog.dismiss()
                }
              } catch (_: Exception) {}
            }
          })
          .start()
      } else {
        try {
          if (dialog.isShowing) {
            dialog.dismiss()
          }
        } catch (_: Exception) {}
      }
    }
  }
}
