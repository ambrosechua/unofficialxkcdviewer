package com.euricainc.ambc.xkcd;

import android.app.Activity;
import android.os.Bundle;
import com.mogoweb.chrome.WebChromeClient;
import com.mogoweb.chrome.WebView;
import com.mogoweb.chrome.WebViewClient;
import com.euricainc.ambc.xkcd.R;

public class MyActivity extends Activity {

    // The onCreate method is called when the Activity is created. Code to instantiate the UI should be placed here.
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		// This call tells the system to inflate the user interface defined in main.xml as the User Interface for this Activity.
		setContentView(R.layout.main); 

        // The WebView needs to use a modified WebViewClient that does not delegate the URL to the default browser.
		final WebView webView = (WebView) findViewById(R.id.webView);
		webView.loadUrl("file:///android_asset/html/index.html");
		webView.getSettings().setAppCacheEnabled(true);
		webView.getSettings().setJavaScriptEnabled(true);
		webView.getSettings().setAllowUniversalAccessFromFileURLs(true);
		webView.setWebViewClient(new WebViewClient() {
			public boolean shouldOverrideUrlLoading(WebView view, String url){
				view.loadUrl(url);
				return false; // Tells the system not to continue propagating the event.
			}
		});
	    webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
            }
        });
		
		// You can add other code here if you want.
	}	
}
