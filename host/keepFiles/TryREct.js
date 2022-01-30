[
    //[PathItem ]
    {
        closed: true,
        area: 44276.3671875, //height* width
        length: 842.21484375,  //2*height+ 2*width
        guides: false,
        filled: true,
        fillColor: //[CMYKColor]
        {
            cyan: 12.9427015781403,
            magenta: 74.9843537807465,
            yellow: 100,
            black: 2.56961919367313,
            typename: "CMYKColor",
        },
        fillOverprint: false,
        stroked: false,
        strokeColor: //[NoColor]
        {
            typename: "NoColor",
        },
        strokeOverprint: false,
        strokeWidth: 1,
        strokeDashes: [],
        strokeDashOffset: 0,
        strokeCap: StrokeCap.BUTTENDCAP,
        strokeJoin: StrokeJoin.MITERENDJOIN,
        strokeMiterLimit: 10,
        clipping: false,
        evenodd: false,
        resolution: 800,
        selectedPathPoints: [
            //[PathPoint]
            {
                anchor: [261.566607267174, -223.5],
                leftDirection: [261.566607267174, -223.5],
                rightDirection: [261.566607267174, -223.5],
                pointType: PointType.CORNER,
                selected: PathPointSelection.ANCHORPOINT,
                typename: "PathPoint",
                parent: "[PathItem ]",
            },
            //[PathPoint]
            {
                anchor: [43.5, -223.5],
                leftDirection: [43.5, -223.5],
                rightDirection: [43.5, -223.5],
                pointType: PointType.CORNER,
                selected: PathPointSelection.ANCHORPOINT,
                typename: "PathPoint",
                parent: "[PathItem ]",
            },
            //[PathPoint]
            {
                anchor: [43.5, -20.4591836929321],
                leftDirection: [43.5, -20.4591836929321],
                rightDirection: [43.5, -20.4591836929321],
                pointType: PointType.CORNER,
                selected: PathPointSelection.ANCHORPOINT,
                typename: "PathPoint",
                parent: "[PathItem ]",
            },
            //[PathPoint]
            {
                anchor: [261.566607267174, -20.4591836929321],
                leftDirection: [261.566607267174, -20.4591836929321],
                rightDirection: [261.566607267174, -20.4591836929321],
                pointType: PointType.CORNER,
                selected: PathPointSelection.ANCHORPOINT,
                typename: "PathPoint",
                parent: "[PathItem ]",
            },
        ],
        polarity: PolarityValues.POSITIVE,
        typename: "PathItem",
        uRL: "",
        note: "",
        layer: //[Layer Layer 1]
        {
            visible: true,
            locked: false,
            printable: true,
            hasSelectedArtwork: true,
            preview: true,
            dimPlacedImages: false,
            color: //[RGBColor]
            {
                red: 78.6926070038911,
                green: 127.501945525292,
                blue: 255,
                typename: "RGBColor",
            },
            name: "Layer 1",
            opacity: 100,
            zOrderPosition: 1,
            absoluteZOrderPosition: 3,
            sliced: false,
            blendingMode: BlendModes.NORMAL,
            isIsolated: false,
            artworkKnockout: KnockoutState.INHERITED,
            typename: "Layer",
            parent: "[Document Untitled-2]",
            layers: //[Layers]
            {
                length: 0,
                parent: "[Layer Layer 1]",
                length: 0,
                typename: "Layers",
            },
        },
        locked: false,
        hidden: false,
        selected: true,
        position: [43.5, -20.4591836929321],
        width: 218.066607267174,
        height: 203.040816307068,
        geometricBounds: [43.5, -20.4591836929321, 261.566607267174, -223.5],
        visibleBounds: [43.5, -20.4591836929321, 261.566607267174, -223.5],
        controlBounds: [43.5, -20.4591836929321, 261.566607267174, -223.5],
        name: "",
        blendingMode: BlendModes.NORMAL,
        opacity: 100,
        isIsolated: false,
        artworkKnockout: KnockoutState.DISABLED,
        zOrderPosition: 1,
        absoluteZOrderPosition: 1,
        editable: true,
        sliced: false,
        top: -20.4591836929321,
        left: 43.5,
    },
];



    CMYKColor.prototype.print = function () {
        var flag = false, str = "{";
        for (var property in this) {
             str += flag ? ", " + property + ": " + this[property] : property + ": " + this[property]; 
             flag = true; 
            } 
            str += "}";
            return str;
        }
