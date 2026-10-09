const monoose = require('mongoose');

const userSchema = new monoose.Schema(

    {

      name: {
        type: String,
        required: true,
        TRIM: true
      },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            TRIM: true
        },

        password: {
            type: String,
            required: true,
        }
    },
    {

        timestamps: true
        }

    );


    module.exports = monoose.model('User', userSchema);