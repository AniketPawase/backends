module.exports=(sequelize,DataTypes)=>{
    const Movie = sequelize.define("Movie",{

        movieName:{
            type: DataTypes.STRING,
            allowNull: false ,
        },
        releaseDate:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        avgRating:{
            type: DataTypes.FLOAT,
            defaultValue: null,
            validate: {
                min: 1,
                max: 10,
              },
        }
    });
    //Associations
    Movie.associate=(models)=>{
        Movie.hasMany(models.Review,{
            onDelete: "CASCADE",
        });
    }
    return  Movie;
};