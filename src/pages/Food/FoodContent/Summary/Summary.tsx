import Text from 'components/Text';
import styles from './Summary.module.scss';

const Summary = ({ children }: { children: string }) => {
  const formatText = (text: string) => {
    const pattern = /(<b>.*?<\/b>|<a.*?<\/a>)/g;

    return text.split(pattern).map((part, index) => {
      if (!part) return null;
      if (part.startsWith('<b>') && part.endsWith('</b>')) {
        const content = part.replace(/<\/?b>/g, '');
        return (
          <Text className={styles.summary__text} tag="span" key={index} weight="bold">
            {content}
          </Text>
        );
      }
      if (part.startsWith('<a')) {
        const match = part.match(/<a href="(.*?)">(.*?)<\/a>/);
        if (match) {
          const [, href, content] = match;
          return (
            <a key={index} href={href} className={styles.summary__link}>
              {content}
            </a>
          );
        }
      }
      return (
        <Text className={styles.summary__text} tag="span" key={index}>
          {part}
        </Text>
      );
    });
  };

  return <div className={styles.summary}>{formatText(children)}</div>;
};

export default Summary;
