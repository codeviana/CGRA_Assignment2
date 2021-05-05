//js
class square extends CGRAobject{
    constructor(glcontext){
        super(glcontext); // initialize the parent class
        this.vColors = [];
        this.vPositions = [];
        this.texCoords = [];
        this.vNormal = [];

        this.Index=0;
        this.positions = [
            glm.vec3( -0.5, -0.5,  0.0 ),
            glm.vec3( -0.5,  0.5,  0.0 ),
            glm.vec3(  0.5,  0.5,  0.0 ),
            glm.vec3(  0.5, -0.5,  0.0 ),
        ];

        this.colors = [
            glm.vec3( 1.0, 0.0, 0.0 ),  // red
            glm.vec3( 1.0, 0.0, 0.0 ),
            glm.vec3( 1.0, 0.0, 0.0 ),
            glm.vec3( 1.0, 0.0, 0.0 )

        ];

        this.tcoords = [
            glm.vec2(0.0,0.0),
            glm.vec2(0.0,1.0),
            glm.vec2(1.0,1.0),
            glm.vec2(1.0,0.0)
        ];


        this.quad( 0, 1, 2, 3 );


        this.vertexbuffer=this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexbuffer);
        var a = new Float32Array(this.vPositions);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, a, this.gl.STATIC_DRAW);

        this.colorbuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorbuffer);
        a = new Float32Array(this.vColors);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, a, this.gl.STATIC_DRAW);

        this.texcoordsbuffer=this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texcoordsbuffer);
        a=new Float32Array(this.texCoords);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, a, this.gl.STATIC_DRAW);
        console.log("texc=" + this.texCoords+ "  a= "+ a + " len= "+a.length)

        this.vNormalbuffer=this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vNormalbuffer);
        a=new Float32Array(this.vNormal);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, a, this.gl.STATIC_DRAW);

        this.numvertices = 6;
    }

    quad(a, b, c, d )
    {

        this.vColors = [].concat(this.vColors,this.colors[a].array);
        this.vPositions = [].concat(this.vPositions,this.positions[a].array);
        this.texCoords = [].concat(this.texCoords,this.tcoords[0].array);

        this.vColors = [].concat(this.vColors, this.colors[b].array);
        this.vPositions = [].concat(this.vPositions,this.positions[b].array);
        this.texCoords = [].concat(this.texCoords, this.tcoords[1].array);

        this.vColors = [].concat(this.vColors, this.colors[c].array);
        this.vPositions = [].concat(this.vPositions, this.positions[c].array);
        this.texCoords = [].concat(this.texCoords,this.tcoords[2].array);

        this.vColors = [].concat(this.vColors, this.colors[a].array);
        this.vPositions = [].concat(this.vPositions, this.positions[a].array);
        this.texCoords = [].concat(this.texCoords, this.tcoords[0].array);

        this.vColors = [].concat(this.vColors, this.colors[c].array);
        this.vPositions = [].concat(this.vPositions, this.positions[c].array);
        this.texCoords = [].concat(this.texCoords,this.tcoords[2].array);

        this.vColors = [].concat(this.vColors,this.colors[d].array);
        this.vPositions = [].concat(this.vPositions, this.positions[d].array);
        this.texCoords = [].concat(this.texCoords, this.tcoords[3].array);

        this.vNormal = glm.vec3(0.0,0.0,1.0);

    }

}

class squareT extends square{

    settexture(cgratex){
        this.textureid = cgratex.textureid;
    }

    setNormalMat(Tarnsform){
        var normalMatrixUniform = this.gl.getUniformLocation(this.shaderprog.shaderProgram, 'NormalMatrix');
        var Tmatrix = Tarnsform;
        this.gl.uniformMatrix3fv(normalMatrixUniform, Tmatrix.array);
    }

    setAmbient(Ambient){
        var AmbientUniform = this.gl.getUniformLocation(this.shaderprog.shaderProgram, 'Ambient');
        var vAmbient = Ambient;
        this.gl.uniform3fv( AmbientUniform, vAmbient.array);
    }

    setAmbient(LightColor){
        var LightColorUniform = this.gl.getUniformLocation(this.shaderprog.shaderProgram, 'LightColor');
        var vLightColor = LightColor;
        this.gl.uniform3fv( LightColorUniform, vLightColor.array);
    }

    setLightDirection(LightDirection){
        var LightDirectionUniform = this.gl.getUniformLocation(this.shaderprog.shaderProgram, 'LightDirection');
        var vLightDirection = LightDirection;
        this.gl.uniform3fv( LightDirectionUniform, vLightDirection.array);
    }

    setHalfVector(HalfVector){
        var HalfVectorUniform = this.gl.getUniformLocation(this.shaderprog.shaderProgram, 'HalfVector');
        var vHalfVector = HalfVector;
        this.gl.uniform3fv(HalfVectorUniform, vHalfVector.array);
    }

    setShininess(Shininess){
        var ShininessUniform = this.gl.getUniformLocation(this.shaderprog.shaderProgram, 'Shininess');
        var vShininess = Shininess;
        this.gl.uniform1f(ShininessUniform, vShininess);
    }

    setStrength(Strength){
        var StrengthUniform = this.gl.getUniformLocation(this.shaderprog.shaderProgram, 'Strength');
        var vStrength = Strength;
        this.gl.uniform1f(StrengthUniform, vStrength);
    }




    drawit(viewMat, projectionMat){
        this.shaderprog.startUsing();
        this.texcoordsLocation = this.gl.getAttribLocation(this.shaderprog.shaderProgram,
            "in_texcoords");

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.texcoordsbuffer);
        this.gl.vertexAttribPointer(this.texcoordsLocation, // Attribute location
            2, // number of elements per attribute
            this.gl.FLOAT,  // Type of elements
            false,  //
            0, //2*Float32Array.BYTES_PER_ELEMENT, // size of a vertex in bytes
            0); // Offset from the begining of a single vertex to this attribute
        this.gl.enableVertexAttribArray(this.texcoordsLocation);

        this.vNormalLocation = this.gl.getAttribLocation(this.shaderprog.shaderProgram,
            "in_Normal");

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vNormalLocation);
        this.gl.vertexAttribPointer(this.vNormalLocation, // Attribute location
            3, // number of elements per attribute
            this.gl.FLOAT,  // Type of elements
            false,  //
            0, //2*Float32Array.BYTES_PER_ELEMENT, // size of a vertex in bytes
            0); // Offset from the begining of a single vertex to this attribute
        this.gl.enableVertexAttribArray(this.vNormalLocation);


        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureid);
        this.texturelocation =  this.gl.getUniformLocation(this.shaderprog.shaderProgram, "uSampler");
        this.gl.uniform1i(this.texturelocation, 0);
        // the parent method does the rest
        super.drawit(viewMat,projectionMat);
    }
}


class squareC extends square{

    constructor(glcontext){
        super(glcontext);
        this.color=glm.vec3(1,0,0);
    }

    setcolor(color){
        this.color = glm.vec3(color);
    }

    drawit(viewMat, projectionMat){
        this.shaderprog.startUsing();
        var colorLocation = this.gl.getUniformLocation(this.shaderprog.shaderProgram,
            "un_Color");
        this.gl.uniform3fv(colorLocation, this.color.array);

        // the parent method does the rest
        super.drawit(viewMat,projectionMat);
    }
}
