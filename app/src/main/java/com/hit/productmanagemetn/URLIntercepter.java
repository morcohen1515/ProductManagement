package com.hit.productmanagemetn;

import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * Hybrid app.
 * Using WebView.
 * setWebViewClient.
 * URLIntercepter
 * */

public class URLIntercepter extends WebViewClient {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        view.loadUrl(url);
        return super.shouldOverrideUrlLoading(view, url);
    }
}
