package com.hit.productmanagemetn;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.webkit.CookieManager;
import android.webkit.WebSettings;
import android.webkit.WebView;

/**
 * Hybrid app.
 * Using WebView.
 * setWebViewClient.
 * setJavaScriptEnabled.
 * setDomStorageEnabled.
 * setAcceptFileSchemeCookies.
 * */

public class MainActivity extends AppCompatActivity {

    WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //Get WebView by id that set in activity_main.xml.
        webView = (WebView) findViewById(R.id.webView);

        //Prevent a transition attempt using a link outside of WebView.
        webView.setWebViewClient(new URLIntercepter());

        //Enable to Debugging.
        webView.setWebContentsDebuggingEnabled(true);

        //javascript Enabled.
        webView.getSettings().setJavaScriptEnabled(true);

        //Dom Storage Enabled.
        WebSettings settings = webView.getSettings();
        settings.setDomStorageEnabled(true);

        //cookie
        CookieManager.setAcceptFileSchemeCookies (true);
        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.setAcceptCookie(true);
        cookieManager.acceptCookie();

        //load the file.
        webView.loadUrl("file:///android_asset/login.html");
    }
}