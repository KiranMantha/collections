import { Fixture, TestBed } from '@plumejs/testing';
import { vi } from 'vitest';
import { AppComponent } from './index';

describe('@plumejs/core Component', () => {
  let appRoot: Fixture<AppComponent>;

  beforeEach(async () => {
    vi.useFakeTimers();
    appRoot = await TestBed.MockComponent(AppComponent);
  });

  it('should be true', () => {
    expect(true).toBe(true);
  });
});
