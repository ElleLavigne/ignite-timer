// Importações.
import { HandPalm, Play } from "phosphor-react"
import { useContext } from "react"
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles"
import { NewCycleForm } from "./components/NewCycleForm"
import * as zod from "zod"
import { Countdown } from "./components/Countdown"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { CyclesContext } from "../../contexts/CyclesContext"

//Interface

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(1, "O cilco precisa ser de no mínimo de 5 minutos")
    .max(60, "O cilco precisa ser de no mínimo de 5 minutos"),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

// Criação  do componente.

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: "",
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCrateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }
  
  const task = watch("task")
  const isSubmitDisabled = !task



  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCrateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
