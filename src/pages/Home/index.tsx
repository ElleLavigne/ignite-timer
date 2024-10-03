// Importações.
import { HandPalm, Play } from "phosphor-react"
import { createContext, useEffect, useState } from "react"
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles"
import { NewCycleForm } from "./components/NewCycleForm"
import { Countdown } from "./components/Countdown"

//Interface
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}
interface CycleContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFineshed: () => void
}

export const CyclesContext = createContext({} as CycleContextType)

// Criação  do componente.
export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  function markCurrentCycleAsFineshed() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      })
    )
  }

  // function handleCrateNewCycle(data: NewCycleFormData) {
  //   const id = String(new Date().getTime())
  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   }
  //   setCycles((state) => [...state, newCycle])
  //   setActiveCycleId(id)
  //   setAmountSecondsPassed(0)
  //   reset()
  // }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      })
    )
    setActiveCycleId(null)
  }
  //  const task = watch("task")
  //  const isSubmitDisabled = !task
  return (
    <HomeContainer>
      <form /*</HomeContainer>onSubmit={handleSubmit(handleCrateNewCycle)} */action="">
        <CyclesContext.Provider
          value={{ activeCycle, activeCycleId, markCurrentCycleAsFineshed }}
        >
          {/* <NewCycleForm /> */}
          <Countdown />
        </CyclesContext.Provider>
        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton /*disabled={isSubmitDisabled}*/ type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
