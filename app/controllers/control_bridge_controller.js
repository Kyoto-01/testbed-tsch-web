import cbapi from "../apis/control_bridge_api.js"


function create_control_msg(req, res, next) {
    res.send(req.body);
}


export default {
    create_control_msg
}
