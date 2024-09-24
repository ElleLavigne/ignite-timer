import { Play } from "phosphor-react";
import { CountdownConatiner, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskIput } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>

          <TaskIput 
          id="task" 
          placeholder="Dê um nome para o seu projeto"
          list="task-suggestions"
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1"/>
            <option value="Projeto 2"/>
            <option value="Banana"/>
          </datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <MinutesAmountInput 
          type="number" 
          id="minutesAmount" 
          placeholder="00"
          step={5}
          max={60}
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
        <StartCountdownButton disabled type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  ) 
  
}
