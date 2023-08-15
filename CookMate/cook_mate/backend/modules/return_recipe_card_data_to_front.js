
const return_recipe_card_data_to_front = async (json_req, ai = false) => {
    if (json_req.length == 0){
        return {message: "no request received"}
    }
    const cards_result = [];
    if (ai) {
        // console.log(`!!!!!!should be an array of 2`,json_req);
        const parsed_data = JSON.parse(json_req[0])
        const image_url = json_req[1]
        // console.log(image_url);
        console.log("received an AI recipe: ", parsed_data);
        const one_card = {
            dish_id: parsed_data.dish_id,
            dish_title: parsed_data.dish_title,
            dish_image: image_url,
            dish_prep_time: parsed_data.dish_prep_time,
            dish_ingridients: parsed_data.dish_ingridients,
            equipment: parsed_data.equipment,
            instructions: parsed_data
        };
        cards_result.push(one_card);
        return { cards_result };
    }
    else {
        for (dish_info of json_req) {
            // console.log(dish_info);
            let ingridients_arr = [];
            let equipments_arr = [];
            let instructions_arr = [];
            // console.log(dish_info);
            for (instruction of dish_info.analyzedInstructions) {
                let ing_id_storage_tmp = [];
                let eqp_id_storage_tmp = [];

                for (one_step of instruction.steps) {
                    // filling the instructions list
                    instructions_arr.push(one_step.step)

                    // filling the ingridients list
                    for (ingridient of one_step.ingredients) {
                        if (ingridient.length == 0) {
                            return
                        }
                        if (!ing_id_storage_tmp.includes(ingridient.id)) {
                            ing_id_storage_tmp.push(ingridient.id);
                            ingridients_arr.push({
                                ingredient_id: ingridient.id,
                                ingridient_name: ingridient.name
                            });
                        }
                    }

                    // filling the equipment list
                    for (equipment of one_step.equipment) {
                        if (equipment.length == 0) {
                            return
                        }
                        if (!eqp_id_storage_tmp.includes(equipment.id)) {
                            eqp_id_storage_tmp.push(equipment.id);
                            equipments_arr.push({
                                equipment_id: equipment.id,
                                equipment_name: equipment.name
                            });
                        }
                    }
                }
            }

            const one_card = {
                dish_id: dish_info.id,
                dish_title: dish_info.title,
                dish_image: dish_info.image,
                dish_prep_time: dish_info.readyInMinutes,
                dish_ingridients: ingridients_arr,
                equipment: equipments_arr,
                instructions: instructions_arr
            };
            cards_result.push(one_card);
        }
        return { cards_result }
    }
    // return { cards_result }
}
module.exports = return_recipe_card_data_to_front;

