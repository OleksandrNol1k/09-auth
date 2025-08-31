"use client"

import css from "./NoteForm.module.css"
import type { NewNote } from "@/lib/api"
import { createNote } from "@/lib/api"
import { useId } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import { useNoteDraftStore } from "@/lib/store/noteStore"

const FormSchema = Yup.object().shape({
    title: Yup.string().min(3, "Too short title!").max(50, "Too long title!").required("Required field"),
    content: Yup.string().max(500, "Too long content!"),
    tag: Yup.string().oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"]).required("Select a tag!"),
});

interface FormValues {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

const formValues: FormValues = {
    title: "",
    content: "",
    tag: "Todo",
}

export interface NoteFormProps {
    onCloseModal: () => void;
}

export default function NoteForm() {
    
    const fieldId = useId();
    const queryClient = useQueryClient();
    const router = useRouter();
    const { draft, setDraft, clearDraft } = useNoteDraftStore();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setDraft({ ...draft, [event.target.name]: event.target.value });
    }

    const { mutate, isPending } = useMutation({
        mutationFn: (newNote: NewNote) => createNote(newNote),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["notes"],
            });
            clearDraft();
            router.push("/notes/filter/all");
        }
    });

    const handleSubmit = (values: FormValues) => {
        mutate({
            title: values.title,
            content: values.content,
            tag: values.tag,
        });
    };

    return (
        <Formik initialValues={draft ?? formValues} validationSchema={FormSchema} onSubmit={handleSubmit} enableReinitialize>
            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-title`}>Title</label>
                    <Field id={`${fieldId}-title`} type="text" name="title" className={css.input} onChange={handleChange} />
                    <ErrorMessage name="title" component="span" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="content">Content</label>
                    <Field as="textarea" id={`${fieldId}-content`} name="content" rows={8} className={css.textarea} onChange={handleChange} />
                    <ErrorMessage name="content" component="span" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-tag`}>Tag</label>
                    <Field as="select" id={`${fieldId}-tag`} name="tag" className={css.select} onChange={handleChange}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage name="tag" component="span" className={css.error} />
                </div>

                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={() => { clearDraft(); router.back()}}>Cancel</button>
                    <button type="submit" className={css.submitButton} disabled={isPending}>
                        {isPending ? "Creating..." : "Create note"}
                    </button>
                </div>
            </Form>
        </Formik>
    );
}