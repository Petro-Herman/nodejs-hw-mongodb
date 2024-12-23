import createHttpError from "http-errors";
import * as authServices from "../services/auth.js";


const setupSession = (res, session) => {
    const { _id, refreshToken, refreshTokenValidUntill } = session;

        res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: refreshTokenValidUntill
    });

    res.cookie("sessionId", _id, {
        httpOnly: true,
        expires: refreshTokenValidUntill
    });

    // res.json({
    //     status: 200,
    //     message: "Successfully login user",
    //     data: {
    //         accessToken,
    //     }
    // })
}

export const registerController = async (req, res) => {
    const data = await authServices.register(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully registered user",
    })
}

export const loginController = async (req, res) => {
    const session = await authServices.login(req.body);

    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfully login user",
        data: {
            accessToken: session.accessToken,
        }
    })
}

export const refreshSessionController = async (req, res) => {
    const session = await authServices.refreshUserSession(req.cookies);

    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfully refresh session",
        data: {
            accessToken: session.accessToken,
        }
    })
}

export const logoutController = async (req, res) => {
    if (req.cookies.sessionId) {
        await authServices.logout(req.cookies.sessionId);
    }

    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");

    res.status(204).send();
}

export const requestResetEmailController = async (req, res) => { //з конспекту
    await authServices.requestResetToken(req.body.email);
    res.json({
        message: 'Reset password email was successfully sent!',
        status: 200,
        data: {},
    });
};

export const resetPasswordController = async (req, res) => {
    await authServices.resetPassword(req.body);
    res.json({
        message: 'Password was successfully reset!',
        status: 200,
        data: {},
    });
}
