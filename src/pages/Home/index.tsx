// Importações.
import { Play } from "phosphor-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"

import {
  CountdownConatiner,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskIput,
} from "./styles"

// _______________________________________

// 
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O cilco precisa ser de no mínimo de 5 minutos")
    .max(60, "O cilco precisa ser de no mínimo de 5 minutos"),
})
  // interface NewCycleFormData {
  //   task: string
  //   minutesAmount: number
  // }
  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

// Criação  do componente.
export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: "",
    },
  })


  function handleCrateNewCycle(data: NewCycleFormData) {
    console.log(data)
    reset()
  }

  const task = watch("task")
  const isSubmitDisabled = !task
  return (
    <HomeContainer>
      {/* Criação fo formulário */}

      <form onSubmit={handleSubmit(handleCrateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskIput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register("task")} 
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Banana" />
          </datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos</span>
        </FormContainer>

        <CountdownConatiner>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownConatiner>
        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
