import { TDog } from '../../lib/models/dog-model';
import { LastActivityCard } from '../last-activity-card/last-activity-card';
import { QuickStats } from '../quick-stats/quick-stats';
import { StartConversationCard } from '../start-conversation-card/start-conversation-card';
import { Typography } from '../ui/typography';

type HomePageComponentProps = {
  dogs: TDog[];
};

export function HomePageComponent({ dogs }: HomePageComponentProps) {
  return (
    <div>
      <Typography variant='h2'>Witaj z powrotem! 🐾</Typography>
      <Typography variant='p'>
        Twój AI behawiorysta zawsze gotowy do pomocy z Twoimi pupilami
      </Typography>
      <QuickStats dogs={dogs} />
      <StartConversationCard />
      <LastActivityCard dogs={dogs} />
    </div>
  );
}
