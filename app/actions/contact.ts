"use server"

import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function submitContactForm(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  if (!name || !email || !message) {
    return { success: false, message: "Todos os campos são obrigatórios." }
  }

  try {
    await addDoc(collection(db, "contacts"), {
      name,
      email,
      message,
      timestamp: serverTimestamp(),
    })
    return { success: true, message: "Mensagem enviada com sucesso!" }
  } catch (error) {
    console.error("Error adding document: ", error)
    return { success: false, message: "Ocorreu um erro ao enviar sua mensagem." }
  }
}
