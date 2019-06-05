import * as Cortex from 'cortex';

import Logo from '../components/Logo';
import Presentation from '../components/Presentation';
import Timeline from '../components/Timeline';

const MONTH = 1 / 12;

export default class TimelineSlide extends Cortex.Component {

    public render(): Cortex.Node[] {
        return [
            <Logo/>,
            <Presentation.Layout direction='vertical' grow={ 1 }>
                <Presentation.Heading level={ 2 }>
                    Historical Timeline
                </Presentation.Heading>
                <Presentation.Layout align='center' grow={ 1 }>
                    <HTMLDivElement id='timeline'>
                        <Timeline range={ [ 2010, 2020 ] }>
                            <Timeline.Event month={ 4 } year={ 2012 }>
                                <Presentation.Text size={ 1.33 }>
                                    Shadow DOM V0 Defined
                                </Presentation.Text>
                            </Timeline.Event>
                            <Timeline.Event month={ 4 } year={ 2013 }>
                                <Presentation.Text size={ 1.33 }>
                                    Custom Elements V0 Defined
                                </Presentation.Text>
                            </Timeline.Event>
                        </Timeline>
                    </HTMLDivElement>
                </Presentation.Layout>
            </Presentation.Layout>
        ];
    }

    public theme(): string {
        return `
            :host {
                display: contents;
            }

            #timeline {
                flex-grow: 1;
                padding: 80px;
            }
        `;
    }
}