import yup from 'yup';

export const votesCreateSchema = yup.object({
    judge_id: yup.string().required("Este campo no puede quedar vacío."),
    gameplay: yup.number("Este campo es numérico.").min(1, "El puntaje mínimo es 1").max(10, "El puntaje máximo es 10").positive("El puntaje deben ser en números positivos").integer("El puntaje debe ser en números enteros.").required("Este campo no puede quedar vacío."),
    art: yup.number("Este campo es numérico.").min(1, "El puntaje mínimo es 1").max(10, "El puntaje máximo es 10").positive("El puntaje deben ser en números positivos").integer("El puntaje debe ser en números enteros.").required("Este campo no puede quedar vacío."),
    sound: yup.number("Este campo es numérico.").min(1, "El puntaje mínimo es 1").max(10, "El puntaje máximo es 10").positive("El puntaje deben ser en números positivos").integer("El puntaje debe ser en números enteros.").required("Este campo no puede quedar vacío."),
    theme: yup.number("Este campo es numérico.").min(1, "El puntaje mínimo es 1").max(10, "El puntaje máximo es 10").positive("El puntaje deben ser en números positivos").integer("El puntaje debe ser en números enteros.").required("Este campo no puede quedar vacío.")
})