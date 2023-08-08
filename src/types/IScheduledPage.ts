export interface IIdPage {
  id: string
}

export interface IScheduledPageSettings {
  datetime: number
  url: string
}

type IScheduledPage = IScheduledPageSettings & IIdPage;

export default IScheduledPage;
