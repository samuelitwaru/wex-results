export default ({ app, router, store }) => {
    app.config.globalProperties.$alert = (title, msg, actionText, actionUrl) => {
        store.state.msgDialogTitle = title
        store.state.msgDialogMsg = msg
        store.state.action = {
            text: actionText,
            url: actionUrl,
        }
        store.state.showMsgDialog = true
    }
}