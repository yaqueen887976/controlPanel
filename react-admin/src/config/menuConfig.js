const menuList = [
    {
        title: 'home', 
        key: '/home', 
        icon: 'home', 
    }, 

    {
        title: 'product', 
        key: '/products', 
        icon: 'appstore', 
        children: [ // sub menu list
            { 
                title: 'category management', 
                key: '/category', 
                icon: 'bars' 
            }, 
            {   
                title: 'product management', 
                key: '/product', 
                icon: 'tool' 
            }, 
        ] 
    },

    {
        title: 'user management', 
        key: '/user', 
        icon: 'user' 
    }, 

    {
        title: 'role management', 
        key: '/role', 
        icon: 'safety', 
    },

    {
        title: 'charts', 
        key: '/charts', 
        icon: 'area-chart', 
        children:[
            {
                title: 'bar chart', 
                key: '/charts/bar', 
                icon: 'bar-chart' 
            },
            {
                title: 'line chart', 
                key: '/charts/line', 
                icon: 'line-chart' 
            }, 
            {   
                title: 'pie chart', 
                key: '/charts/pie', 
                icon: 'pie-chart' },
                
        ]
    },
        
        
]

export default menuList;