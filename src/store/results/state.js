export default function() {
    return {
        loading: false,
        show: false,
        msg: "",
        isAuthenticated: false,
        token: null,
        user: null,
        groups: [],
        profile: null,
        formDataErrors: {},
    };
}
