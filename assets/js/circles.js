zen_offsets = [[120,160],[120,160],[70,330],[235,265],[300,300],[300,300],[380,220],[380,220],[-40,-80],[410,50],[480,440],[410,50],[280,20]]

// for each shape, we need a two item array of the circles that compose it. for each circle, we need
// x, y, radius, start, end, direction
shapes = [

    //shape A: circle 1, circle 2
    [[120,160,40*2,0.8*Math.PI,0.11*(Math.PI),false],
    [150,370,95*2,1.577*(Math.PI),1.331*Math.PI,true]],

    //shape B: circle 1, circle 2
    [[120,160,40*2,0.8*Math.PI,0.11*(Math.PI),true],
    [150,370,95*2,1.577*(Math.PI),1.331*Math.PI,true]],

    //shape C: circle 3, circle 2, circle 1, circle 2
    [[430,170,50*2,0.665*Math.PI,1.258*Math.PI,false],
    [200,200,95*2,1.82*(Math.PI),1.579*(Math.PI),true],
    [170,-10,40*2,0.11*(Math.PI),0.8*Math.PI,false],
    [200,200,95*2,1.332*(Math.PI),0.096*Math.PI,true]],

    //shape D: circle 2, circle 3
    [[35,265,95*2,1.82*Math.PI,0.096*(Math.PI),false],
    [265,235,50*2,0.665*Math.PI,1.258*Math.PI,false]],
    
    //shape E: circle 2, circle 3, circle 4, circle 3
    [[-30,230,95*2,1.82*Math.PI,0.096*(Math.PI),false],
    [200,200,50*2,0.665*Math.PI,1.99*Math.PI,true],
    [280,120,40*2,0.43*Math.PI,1.08*Math.PI,false],
    [200,200,50*2,1.5*Math.PI,1.258*Math.PI,true]],

    //shape F: circle 3, circle 4
    [[200,200,50*2,1.505*Math.PI,1.99*Math.PI,false],
    [280,120,40*2,0.43*Math.PI,1.08*Math.PI,false],],

    //shape G: circle 3, circle 4, circle 5, circle 4
    [[120,280,50*2,1.505*Math.PI,1.99*Math.PI,false],
    [200,200,40*2,0.41*Math.PI,1.89*Math.PI,true],
    [230,30,75*2,0.4*Math.PI,0.7*Math.PI,false],
    [200,200,40*2,1.222*Math.PI,1.075*Math.PI,true]],

    //shape H: circle 5, circle 4
    [[230,30,75*2,0.4*Math.PI,0.7*Math.PI,false],
    [200,200,40*2,1.222*Math.PI,1.89*Math.PI,false]],

    //shape M: circle 8
    [[200,200,40*2,0,2*Math.PI,false]],

    //shape I: circle 4, circle 5, circle 6, circle 5
    [
    [170,370,40*2,1.222*Math.PI,1.89*Math.PI,false],
    [200,200,75*2,0.406*Math.PI,1.348*Math.PI,true],
    [70,170,60*2,1.672*Math.PI,0.4745*Math.PI,false],
    [200,200,75*2,0.795*Math.PI,0.71*Math.PI,true]
    ],

    //shape L: circle 7
    [[200,200,40*2,0,2*Math.PI,false]],

    //shape J: circle 6, circle 5
    [[70,170,60*2,1.672*Math.PI,0.4745*Math.PI,false],
    [200,200,75*2,0.795*Math.PI,1.348*Math.PI,false]],

    //shape K: circle 6, circle 5
    [[200,200,60*2,1.672*Math.PI,0.4745*Math.PI,true],
    [330,230,75*2,0.795*Math.PI,1.348*Math.PI,false]]
]