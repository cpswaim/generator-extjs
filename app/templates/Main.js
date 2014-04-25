Ext.define('<%= packageName %>.view.Main', {
  extend: 'Ext.container.Viewport',
  layout: 'fit',
  items: [
    {
      xtype: 'panel',
      padding: 20,
      title: 'Hello World!',
      html: 'Welcome to awesomeapp'
    }
  ]
});