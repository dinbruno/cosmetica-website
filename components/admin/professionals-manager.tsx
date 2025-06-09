"use client"

import { useState, useEffect } from "react"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Edit } from "lucide-react"
import Image from "next/image"
import EditProfessionalModal from "./edit-professional-modal"

export type Professional = {
  id: string
  name: string
  role: string
  crf: string
  img: string
  order: number
}

export default function ProfessionalsManager() {
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const q = query(collection(db, "professionals"), orderBy("order"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const professionalsData: Professional[] = []
      querySnapshot.forEach((doc) => {
        professionalsData.push({ id: doc.id, ...doc.data() } as Professional)
      })
      setProfessionals(professionalsData)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleEdit = (professional: Professional) => {
    setSelectedProfessional(professional)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {professionals.map((prof) => (
          <Card key={prof.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-56 w-full">
                <Image src={prof.img || "/placeholder.svg"} alt={prof.name} layout="fill" className="object-cover" />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg">{prof.name}</CardTitle>
              <p className="text-sm text-gray-600">{prof.role}</p>
              <p className="text-xs text-gray-500">{prof.crf}</p>
              <Button size="sm" className="w-full mt-4" onClick={() => handleEdit(prof)}>
                <Edit className="mr-2 h-4 w-4" /> Editar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedProfessional && (
        <EditProfessionalModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} professional={selectedProfessional} />
      )}
    </>
  )
}
