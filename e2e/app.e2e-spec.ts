import { MyMuziPage } from './app.po';

describe('my-muzi App', function() {
  let page: MyMuziPage;

  beforeEach(() => {
    page = new MyMuziPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
