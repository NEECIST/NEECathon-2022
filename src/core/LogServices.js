import supabaseClient from "../utils/supabaseClient";

const LogsServices = {
    getLogs: async function () {
        try {
            let logs = [];
            let { data, error, status } = await supabaseClient.from("Logs").select(`*`);

            if (error && status !== 406) {
                throw error;
            }
            if (data) {
                data.forEach((log) => {
                    let components = []
                    log.COMPONENTS.forEach(async (component) => {
                        let item = {}
                        try {
                            let { data, error, status } = await supabaseClient.from("Components").select(`*`).eq("IDCOMPONENT", component.component_id);

                            if (error && status !== 406) {
                                throw error;
                            }
                            if (data) {
                                item.NAME = data[0].NAME;
                                item.IMAGE = data[0].IMAGE;
                                item.QUANTITY = component.quantity;
                                components.push(item);
                            }
                        } catch (error) {
                            alert(error.message);
                        }
                    })
                    log.COMPONENTS = components;
                    logs.push(log);
                })
            }
            return logs;
        } catch (error) {
            alert(error.message);
        }
    },


};

export default LogsServices;
