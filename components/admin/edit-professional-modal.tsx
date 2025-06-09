"use client"

import type React from "react"

import { useState, type Dispatch, type SetStateAction } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useActionState } from "react" // Correct: useActionState is from 'react'
import { useFormStatus } from "react-dom" // Correct: useFormStatus is from 'react-dom'
import { updateProfessional } from "@/app/actions/professionals"
import type { Professional } from "./professionals-manager"

const initialState = {
  message: "",
  success: false,
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Salvar Alterações"}
    </Button>
  )
}

export default function EditProfessionalModal({
  isOpen,
  setIsOpen,
  professional,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  professional: Professional
}) {
  const [state, formAction] = useActionState(updateProfessional, initialState)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setImagePreview(null)
      state.message = "" // Reset message on close
    }
    setIsOpen(open)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Profissional</DialogTitle>
          <DialogDescription>Altere as informações de {professional.name}.</DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-4 py-4">
          <input type="hidden" name="id" value={professional.id} />
          <input type="hidden" name="currentImageUrl" value={professional.img} />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input id="name" name="name" defaultValue={professional.name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Cargo
            </Label>
            <Input id="role" name="role" defaultValue={professional.role} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="crf" className="text-right">
              CRF
            </Label>
            <Input id="crf" name="crf" defaultValue={professional.crf} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Foto
            </Label>
            <Input id="image" name="image" type="file" className="col-span-3" onChange={handleImageChange} />
          </div>
          {imagePreview && (
            <div className="col-span-4 flex justify-center">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="h-32 w-32 rounded-full object-cover"
              />
            </div>
          )}
          <DialogFooter>
            {state?.message && (
              <p className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>{state.message}</p>
            )}
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
