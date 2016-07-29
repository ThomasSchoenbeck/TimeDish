import { TimeDishv2Page } from './app.po';

describe('time-dishv2 App', function() {
  let page: TimeDishv2Page;

  beforeEach(() => {
    page = new TimeDishv2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
