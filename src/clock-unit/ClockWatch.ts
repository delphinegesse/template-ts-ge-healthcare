import { Hour } from "./components/Hour";
import { Minute } from "./components/Minute";
import { WatchMode, WatchModeType } from "./components/WatchMode";

const numberOfMillisecondsInAMinute = 60000;

export class ClockWatch {
  private readonly mode: WatchMode;
  private isLightOn: boolean;
  private readonly hour: Hour;
  private readonly minute: Minute;
  private readonly container: HTMLDivElement;
  private readonly buttonContainer: HTMLDivElement;
  private readonly timeDisplay: HTMLDivElement;

  constructor(containerId: string) {
    this.mode = new WatchMode();
    this.hour = new Hour();
    this.minute = new Minute();
    this.isLightOn = false;

    this.container = document.getElementById(containerId) as HTMLDivElement;

    // Create time display element
    this.timeDisplay = document.createElement('div');
    this.container.appendChild(this.timeDisplay);
    this.timeDisplay.classList.add('clock-digits');
    this.updateTime();

    this.buttonContainer = document.createElement('div');
    this.container.appendChild(this.buttonContainer);
    this.buttonContainer.classList.add('button-container');

    // Create buttons
    this.createButton('Mode', this.onModePress.bind(this));
    this.createButton('Increase', this.onIncreasePress.bind(this));
    this.createButton('Light switch', this.onLightswitchPress.bind(this));

    setInterval(this.passMinute.bind(this), numberOfMillisecondsInAMinute);
  }

  private createButton(label: string, clickHandler: () => void) {
    const button = document.createElement('button');
    button.textContent = label;
    button.addEventListener('click', clickHandler);
    this.buttonContainer.appendChild(button);
  }

  onModePress(): void {
    this.mode.toggle();
  }

  onLightswitchPress(): void {
    this.isLightOn = !this.isLightOn;
    
    if(this.isLightOn){
      this.applyLightMode();
    }
    else {
      this.applyDarkMode();
    }
  }

  onIncreasePress(): void {
    const currentMode = this.mode.get();
    switch (currentMode) {        
      case WatchModeType.EDIT_HOUR:
        this.hour.increase();
        this.updateTime();
        break;
      
      case WatchModeType.EDIT_MINUTE:
        this.minute.increase();
        this.updateTime();
        break;
    
      case WatchModeType.NOT_EDITABLE:
      default:
        break;
    }
  }

  private updateTime() {
    const hours = this.hour.get().toString().padStart(2, '0');
    const minutes = this.minute.get().toString().padStart(2, '0');
    this.timeDisplay.textContent = `${hours}:${minutes}`;
  }

  private passMinute() {
    const isHourChanging = this.minute.increase();
    if(isHourChanging)
      this.hour.increase();
    this.updateTime();
  }

  
  applyLightMode(): void {
    //TODO
  }

  applyDarkMode(): void {
    //TODO
  }
}
  