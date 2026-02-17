import mongoose, {Schema, Document} from "mongoose";


export interface Message extends Document{  // this is interface
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({  //this is schema
    content: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }

})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema({  //this is schema
    username: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        unique: true
    },

    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/.+@.+\..+/, "email must be valid"]
    },

    password: {
        type: String,
        required: [true, "password is required"],
        trim: true,
        minLength: [8, "password must be at least 8 characters"]
    },

    verifyCode: {
        type: String,
        required: [true, "verifyCode is required"],
        trim: true,
        unique: true
    },

    verifyCodeExpiry: {
        type: Date,
        required: [true, "verifyCodeExpiry is required"],
        default: Date.now
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isAcceptingMessage: {
        type: Boolean,
        required: [true, "isAcceptingMessage is required"],
        default: false
    },

    messages: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)
export default UserModel;