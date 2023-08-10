
const parse_db_recipe_data = (data_arr) => {
    let cards_array = []

    console.log(data_arr.length);
    for (dish of data_arr) {
        console.log(dish);
        let equipment_arr = []
        let ingredients_arr = []
        try {
            let [equipment, ingredients] = [dish.equipments, dish.ingredients]
            // console.log("ingredients: ", ingredients);
            equipment = equipment.replace(/\\/g, '');
            equipment = equipment.replace(/{/g, '');
            equipment = equipment.replace(/}/g, '');
            equipment = equipment.replace(/"/g, '');
            let key_value_equipment = equipment.split(',')

            ingredients = ingredients.replace(/\\/g, '');
            ingredients = ingredients.replace(/{/g, '');
            ingredients = ingredients.replace(/}/g, '');
            ingredients = ingredients.replace(/"/g, '');
            let key_value_ingredients = ingredients.split(',')
            // console.log("key_value_ingredients: ", key_value_ingredients);

            if (key_value_ingredients.length > 0) {
                for (let i = 0; i < key_value_ingredients.length; i += 2) {
                    if (key_value_ingredients[i].length > 0) {
                        const ingredient_id = key_value_ingredients[i].split(':')[1];
                        const ingridient_name = key_value_ingredients[i + 1].split(':')[1];

                        ingredients_arr.push({
                            ingredient_id: ingredient_id,
                            ingridient_name: ingridient_name
                        });
                    }
                }
            }

            if (key_value_equipment.length > 0) {
                for (let i = 0; i < key_value_equipment.length; i += 2) {
                    if (key_value_equipment[i].length > 0) {
                        const equipment_id = key_value_equipment[i].split(':')[1];
                        const equipment_name = key_value_equipment[i + 1].split(':')[1];

                        equipment_arr.push({
                            equipment_id: equipment_id,
                            equipment_name: equipment_name
                        });
                    }
                }
            }

            let instructions = dish.instructions
            instructions = instructions.replace('{', '')
            instructions = instructions.replace('}', '')
            instructions = instructions.replace('"', '')
            let instructions_arr = instructions.split('","').map(step => step)

            let one_card = {
                dish_id: dish.dish_id,
                dish_title: dish.title,
                dish_image: dish.image,
                dish_prep_time: dish.cooking_time,
                instructions: instructions_arr,
                equipment: equipment_arr,
                dish_ingridients: ingredients_arr,
                favorite_id: dish.favorite_id

            }
            cards_array.push(one_card)
        } catch (error) {
            console.error('Error parsing equipment:', error);
        }

    }

    console.log("cards_array: ", cards_array);
    return cards_array
}

module.exports = { parse_db_recipe_data }


