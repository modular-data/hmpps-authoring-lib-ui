import { WidthContainer } from '../../layout/width-container';
import { MainWrapper } from '../../layout/main-wrapper';
import { type GovukPageTemplateContentProps } from './page-template-content.types';

export const GovukPageTemplateContent = ({
  main,
  containerClassName,
  beforeContent,
  mainClassName,
  mainSpacing,
  mainLang,
  children,
}: GovukPageTemplateContentProps) => {
  if (main !== undefined) {
    return main;
  }

  return (
    <WidthContainer className={containerClassName}>
      {beforeContent}
      <MainWrapper
        className={mainClassName}
        id="main-content"
        spacing={mainSpacing}
        lang={mainLang}
      >
        {children}
      </MainWrapper>
    </WidthContainer>
  );
};
