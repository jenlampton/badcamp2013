/**
 * @file
 * Provides JavaScript additions to the managed file field type.
 *
 * This file provides progress bar support (if available), popup windows for
 * file previews, and disabling of other file fields during Ajax uploads (which
 * prevents separate file fields from accidentally uploading files).
 */(function(a){Drupal.behaviors.fileValidateAutoAttach={attach:function(b,c){c.file&&c.file.elements&&a.each(c.file.elements,function(d){var e=c.file.elements[d];a(d,b).bind("change",{extensions:e},Drupal.file.validateExtension)})},detach:function(b,c){c.file&&c.file.elements&&a.each(c.file.elements,function(c){a(c,b).unbind("change",Drupal.file.validateExtension)})}},Drupal.behaviors.fileButtons={attach:function(b){a("input.form-submit",b).bind("mousedown",Drupal.file.disableFields),a("div.form-managed-file input.form-submit",b).bind("mousedown",Drupal.file.progressBar)},detach:function(b){a("input.form-submit",b).unbind("mousedown",Drupal.file.disableFields),a("div.form-managed-file input.form-submit",b).unbind("mousedown",Drupal.file.progressBar)}},Drupal.behaviors.filePreviewLinks={attach:function(b){a("div.form-managed-file .file a, .file-widget .file a",b).bind("click",Drupal.file.openInNewWindow)},detach:function(b){a("div.form-managed-file .file a, .file-widget .file a",b).unbind("click",Drupal.file.openInNewWindow)}},Drupal.file=Drupal.file||{validateExtension:function(b){a(".file-upload-js-error").remove();var c=b.data.extensions.replace(/,\s*/g,"|");if(c.length>1&&this.value.length>0){var d=new RegExp("\\.("+c+")$","gi");if(!d.test(this.value)){var e=Drupal.t("The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.",{"%filename":this.value,"%extensions":c.replace(/\|/g,", ")});return a(this).closest("div.form-managed-file").prepend('<div class="messages error file-upload-js-error">'+e+"</div>"),this.value="",!1}}},disableFields:function(b){var c=this;if(!a(c).hasClass("ajax-processed"))return;var d=[];a(this).closest("div.form-managed-file").length>0&&(d=a(this).closest("div.form-managed-file").find("input.form-file"));var e=a("div.form-managed-file input.form-file").not(d).not(":disabled");e.attr("disabled","disabled"),setTimeout(function(){e.attr("disabled",!1)},1e3)},progressBar:function(b){var c=this,d=a(c).closest("div.form-managed-file").find("input.file-progress");if(d.length){var e=d.attr("name");d.attr("name",e.match(/APC_UPLOAD_PROGRESS|UPLOAD_IDENTIFIER/)[0]),setTimeout(function(){d.attr("name",e)},1e3)}setTimeout(function(){a(c).closest("div.form-managed-file").find("div.ajax-progress-bar").slideDown()},500)},openInNewWindow:function(b){return a(this).attr("target","_blank"),window.open(this.href,"filePreview","toolbar=0,scrollbars=1,location=1,statusbar=1,menubar=0,resizable=1,width=500,height=550"),!1}}})(jQuery);