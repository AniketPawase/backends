module.exports=(sequelize,DataTypes)=>{
    const Review = sequelize.define("Review",{

        reviewerName:{
            type: DataTypes.STRING,
            allowNull: false ,
        },
        rating:{
            type: DataTypes.INTEGER,
            defaultValue: null,
            validate: {
                min: 1,
                max: 10,
              },
        },
        reviewComments:{
            type: DataTypes.STRING,
            allowNull:false,
        },
    });


    return  Review;
};