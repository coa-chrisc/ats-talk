/**
 * What slide 3 draws (layout-learning.ts): each group's heading and its
 * logo tiles, and the larger card at the right of the courses, its logo
 * and title on its face and its school and when set over the face's foot.
 * Every part is HTML.
 */
import { LEARNING } from "./layout-learning";
import { Card, Logo, LogoTile, Text } from "./parts";

export function LearningHtml() {
  const { courses, big, partners } = LEARNING;
  return (
    <>
      {[courses, partners].map((group) => [
        <Text key={group.head.key} id={group.head.key} at={group.head.at} text={group.head.text} kind="heading" />,
        ...group.tiles.map((tile) => <LogoTile key={tile.key} id={tile.key} at={tile.at} src={tile.src} alt={tile.text} size={tile.size} />),
      ])}
      <Card id={big.key} at={big.at}>
        <Logo className="who-card__logo" src={big.logo.src} alt={big.logo.text} size={big.logo.at} />
        <span className="who-card__title">
          {big.title.lines.map((line) => (
            <span key={line} className="who-card__line">
              {line}
            </span>
          ))}
        </span>
      </Card>
      <Text id={big.school.key} at={big.school.at} text={big.school.text} kind="school" />
      <Text id={big.when.key} at={big.when.at} text={big.when.text} kind="when" />
    </>
  );
}
