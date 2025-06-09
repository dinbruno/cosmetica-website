"use server"

import { doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage } from "@/lib/firebase"
import { revalidatePath } from "next/cache"

export async function updateProfessional(prevState: any, formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const role = formData.get("role") as string
  const crf = formData.get("crf") as string
  const imageFile = formData.get("image") as File
  const currentImageUrl = formData.get("currentImageUrl") as string

  let imageUrl = currentImageUrl

  try {
    // Handle image upload if a new one is provided
    if (imageFile && imageFile.size > 0) {
      // Delete old image if it's not a placeholder
      if (currentImageUrl && !currentImageUrl.includes("placeholder.svg")) {
        const oldImageRef = ref(storage, currentImageUrl)
        try {
          await deleteObject(oldImageRef)
        } catch (error: any) {
          // It's okay if the old image doesn't exist, log it and continue
          if (error.code !== "storage/object-not-found") {
            throw error
          }
          console.warn("Old image not found, continuing with upload:", currentImageUrl)
        }
      }

      // Upload new image
      const storageRef = ref(storage, `professionals/${id}/${imageFile.name}`)
      const snapshot = await uploadBytes(storageRef, imageFile)
      imageUrl = await getDownloadURL(snapshot.ref)
    }

    // Update Firestore document
    const professionalRef = doc(db, "professionals", id)
    await updateDoc(professionalRef, {
      name,
      role,
      crf,
      img: imageUrl,
    })

    revalidatePath("/") // Revalidate home page to show updated professional
    revalidatePath("/admin/professionals") // Revalidate admin page

    return { success: true, message: "Profissional atualizado com sucesso!" }
  } catch (error) {
    console.error("Error updating professional: ", error)
    return { success: false, message: "Falha ao atualizar profissional." }
  }
}
