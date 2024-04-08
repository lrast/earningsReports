console.log('did this run?')

var dagfuncs = window.dashAgGridFunctions = window.dashAgGridFunctions || {};
var dagcomponentfuncs = (window.dashAgGridComponentFunctions = window.dashAgGridComponentFunctions || {});


dagcomponentfuncs.FormatURL = function(props) {
    return React.createElement(
        'a',
        {href: props.value},
        'filing'
    );
}

dagfuncs.withCaveats = function(entry) {
    // the field tells us what the column we care about 
    field = entry.colDef.field

    if (entry.data[field + '_notes'] == null) {
         return entry.value
    }

    return entry.value + entry.data[field + '_notes']
    // console.log(entry.colDef.field, entry.value)
}
