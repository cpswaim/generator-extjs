Ext.Loader.setPath('<%= packageName %>', 'scripts/');
Ext.application({
    requires: ['<%= packageName %>.view.Main'],
    name: 'AM',
    appFolder: 'app',
    launch: function() {
        Ext.create('<%= packageName %>.view.Main', {});
    }
});